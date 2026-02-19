import { Page, test, expect } from '@playwright/test';
const locators = require('../../../../../common/Locators/JMC/Locators.json')
import { LetterStore } from '../pages/letterstorepage';
import { LogisticsPartnerSimulator } from '../pages/LogisticsPartnerSimulator';
import { username,password } from '../../../common/config';
import { GeneralJMC } from '../pages/GeneralJMC';



test.describe('Loxxess Letter test', () => {
    
        test('Loxxess response', async ({ page }) => {
            let letterstore = new LetterStore(page);
            let logisticspartnersimulator = new LogisticsPartnerSimulator(page);
            let generaljmc = new GeneralJMC(page);
            await generaljmc.JMCLogin( username ,password);
            await letterstore.OpenLetterStore("AccountNumber","235332288");
            await letterstore.VerifyLoxxessTransferred();
            const zipFileName = await letterstore.GetZipFileName();
            await logisticspartnersimulator.OpenLogisticsPartnerSimulator();
            const LoxxessResponse = await logisticspartnersimulator.SimulateLoxxessResponse(zipFileName);
            console.log ("Loxxess Response is ", LoxxessResponse);

        });

});
