"use server";

import { writeFile } from 'fs/promises';
import { join } from 'path';
import * as fs from "fs";
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(data, dir) {
    const file = data.get("fileUpload");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "_" + uuidv4() + "_" + file.name;

    if(!fs.existsSync(dir))
    {
        fs.mkdirSync(dir, {recursive: true});
    }

    const path = join(process.cwd(), dir, fileName);

    await writeFile(path, buffer);

    return fileName;
}