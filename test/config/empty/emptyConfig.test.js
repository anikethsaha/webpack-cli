'use strict';
const { stat } = require('fs');
const { resolve } = require('path');
const { run, extractSummary } = require('../../utils/test-utils');

describe('config flag test : Empty config file', () => {
    it('compile but throw missing entry module error', done => {
        const { stdout, stderr } = run(__dirname, ['-c', resolve(__dirname, 'webpack.config.js')]);
        const summary = extractSummary(stdout);
        const outputDir = 'empty/bin';
        const outDirectoryFromCompiler = summary['Output Directory'];
        const outDirToMatch = outDirectoryFromCompiler
            .split('\\')
            .slice(outDirectoryFromCompiler.split('\\').length - 2, outDirectoryFromCompiler.split('\\').length)
            .join('/');
        expect(outDirToMatch).toContain(outputDir);
        expect(stderr).toContain('Entry module not found');
        stat(resolve(__dirname, './bin'), (err, stats) => {
            expect(err).toBe(null);
            expect(stats.isDirectory()).toBe(true);
            done();
        });
    });
});
