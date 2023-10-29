"use server";

import * as fs from "fs";
import {join} from "path";

export async function readUploadedFile  (fileName, dir) {
    const path = join(process.cwd(), dir, fileName)
    return fs.readFileSync(path, {encoding: 'base64'});
}
