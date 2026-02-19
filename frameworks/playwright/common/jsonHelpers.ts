import { promises as fs } from 'fs';

export async function readJsonFileAsString(filePath: string): Promise<string> {
    const content = await fs.readFile(filePath, 'utf-8');
    try {
        const parsed = JSON.parse(content);
        return JSON.stringify(parsed);
    } catch {
        return content;
    }
}

export function replaceKeys(str: string, values?: Record<string, string | number | null> | null): string {
    let replaced = str;
    if (values) {
        Object.entries(values).forEach(([key, value]) => {
            if (value === null || typeof value === 'number') {
                const quotedPattern = new RegExp(`"\\{\\{${key}\\}\\}"`, 'g');
                replaced = replaced.replace(quotedPattern, String(value));
            } else {
                const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                replaced = replaced.replace(pattern, String(value));
            }
        });
    }
    return replaced;
}
