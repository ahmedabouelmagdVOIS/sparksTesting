import util from 'util';
import {exec} from 'child_process';

const execAsync = util.promisify(exec);

export async function getCustomerId(environment: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('getCustomerId timed out after 10 minutes'));
        }, 300000);
        exec(`git pull && cd /projects/src/captive_portal && phing createCaptivePortalCustomer -Denvironment=${environment}`, (error, stdout) => {
            clearTimeout(timeout);
            if (error) {
                return reject(error);
            }
            const match = stdout.match(/"customerId"\s*:\s*"(\d+)"/);
            if (!match || !match[1]) {
                return reject(new Error('customerId not found in command output'));
            }
            resolve(match[1]);
        });
    });
}