/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
const rollup = require("rollup");
const fs = require("fs");
const zlib = require("zlib");
let builds = require("./config").getAllBuilds();

function build(builds) {
  let built = 0;
  const total = builds.length;
  const next = () => {
    buildEntry(builds[built])
      .then(() => {
        built++;
        if (built < total) {
          next();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  next();
}

function buildEntry(config) {
  const output = config.output;
  const { file } = output;
  return rollup
    .rollup(config)
    .then((bundle) => bundle.generate(output))
    .then(({ output: [{ code }] }) => {
      return write(file, code);
    });
}

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      resolve();
    }

    fs.writeFile(dest, code, (err) => {
      if (err) return reject(err);
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
          report(" (gzipped: " + getSize(zipped) + ")");
        });
      } else {
        report();
      }
    });
  });
}

build(builds);
