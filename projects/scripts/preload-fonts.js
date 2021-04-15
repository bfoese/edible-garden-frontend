// eslint-disable-next-line @typescript-eslint/no-var-requires
const program = require('commander');
const fs = require('fs');

const handleError = (message) => {
  console.error(message);
  process.exit(1);
};

/**
 * Converts a path to Unix format which can be handled on all platforms.
 *
 * @param {string} path - Unix or Windows path, with or without trailing
 * slash/backslash, e.g. `foo/bar/baz`, `foo/bar/baz/`, `foo\\bar\\baz`,
 * `foo\\bar\\baz\\`
 * @returns These
 * `foo/bar/baz`, `foo/bar/baz/`, `foo\\bar\\baz`, `foo\\bar\\baz\\` path
 * definitions will all return the same result, which is `foo/bar/baz`.
 */
const normalizePath = (path) => {
  return path ? path.replace(/\\/g, '/').replace(/\/$/, '') : path;
};

program
  .version('1.0.0')

  // [include...] is supposed to be converted to an array when provided with space separated value list. Does not work for me, therefore I use comma separated string and create the array myself
  .option(
    '-i, --include [include]',
    'Optional comma separated list of font names to include for the preload link generation. Other font names will be ignored. Provide the names without file extension, e.g. "helvetica" instead of "helvetica.woff2"'
  )
  .option(
    '-e, --exclude [exclude]',
    'Optional comma separated list of font names to exclude from the preload link generation. Provide the names without file extension, e.g. "helvetica" instead of "helvetica.woff2"'
  )
  .option(
    '-d, --dist <dist>',
    'Path to build output directory. If Angular generates multiple builds (e.g. one for each i18n language) provide the path of the root directory of these builds.'
  )
  .option(
    '-f, --file [file]',
    'This will default to index.html. If your entry file has a different name, provide it with this option.'
  )
  .parse(process.argv);

// console.log('Options: ', program.opts());
// console.log('Remaining arguments: ', program.args);

if (!program.dist) {
  handleError('Please specify the build output directory of your application');
}

program.dist = normalizePath(program.dist);
program.file = program.file ?? 'index.html';
const regexFontType = /(\.[\w\d]*)$/;
const regexFileTypeWithOptionalFingerprint = /((\.[a-z0-9]*)?(\.[\w\d]*){1})$/;

const getFontType = (font) => {
  const fileTypeMatch = font.match(regexFontType);
  const fileType =
    fileTypeMatch && fileTypeMatch.length > 0
      ? fileTypeMatch[0].toLowerCase()
      : undefined;

  if (fileType && ['.ttf', '.woff', '.woff2'].includes(fileType)) {
    return fileType.substr(1); // without leading dot
  }
  return undefined;
};

const isAppBuildDir = (dir, indexFile) => {
  return dir && indexFile && fs.existsSync(`${dir}/${indexFile}`);
};

const getAppBuildDirs = (root, indexFile) => {
  const appBuildDirs = [];
  if (isAppBuildDir(root, indexFile)) {
    appBuildDirs.push(root);
  } else {
    const children = fs.readdirSync(root);
    if (children) {
      for (const child of children) {
        if (isAppBuildDir(`${root}/${child}`, indexFile)) {
          appBuildDirs.push(`${root}/${child}`);
        }
      }
    }
  }
  return appBuildDirs;
};

const getFileName = (font) => {
  const match = font.match(regexFileTypeWithOptionalFingerprint);
  return match && match.length > 0
    ? font.substr(0, font.indexOf(match[0]))
    : undefined;
};

const appBuildDirs = getAppBuildDirs(program.dist, program.file);

if (!appBuildDirs || appBuildDirs.length === 0) {
  handleError(
    `Could not find ${program.file} in ${program.dist} or on of its subdirectories. Did you defined the right build output path and is your build finished?`
  );
}

for (const appBuildDir of appBuildDirs) {
  const fonts = new Map();
  const files = fs.readdirSync(appBuildDir);
  for (const file of files) {
    const fontType = getFontType(file);
    if (!fontType) {
      continue; // this is no font file
    }
    const filename = getFileName(file)?.toLowerCase();
    if (
      program.exclude &&
      program.exclude
        .split(',')
        .some((exclude) => filename === exclude.toLowerCase())
    ) {
      continue;
    }

    if (
      !program.include ||
      program.include
        .split(',')
        .some((include) => filename === include.toLowerCase())
    ) {
      fonts.set(file, fontType);
    }
  }

  if (fonts && fonts.size > 0) {
    const preloadFontLinks = Array.from(fonts.keys())
      .map(
        (font) =>
          `<link rel="preload" as="font" href="${font}" type="font/${fonts.get(
            font
          )}" crossorigin="anonymous">`
      )
      .join('\n');
    const indexFilePath = `${appBuildDir}/${program.file}`;

    const indexFileContent = fs.readFileSync(indexFilePath, 'utf8');
    fs.writeFileSync(
      indexFilePath,
      indexFileContent.replace(
        /(<!\-\- inject:preload-fonts \-\->)([\s\S]*?)(<!\-\- endinject \-\->)/gm,
        preloadFontLinks
      )
    );

    console.log(
      `Included ${fonts.size} preload font links in ${indexFilePath}`
    );
  }
}
