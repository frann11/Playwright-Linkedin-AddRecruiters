const {chromium} = require('playwright')
const fs = require('fs')
require('dotenv').config()

const addProfiles = async function automateAddProfilesOnLinkedin ({profileSearched, cuantity}) {
    const browser = await chromium.launch({ headless: false})
    const context = await browser.newContext();
    const page = await context.newPage()
    const cookiesExist = fs.existsSync('cookies.json')
    if (cookiesExist){

        // if there are cookies already saved, it will skip login
        const cookies = fs.readFileSync('cookies.json', 'utf8') 
        const deserializedCookies = JSON.parse(cookies)
        await context.addCookies([...deserializedCookies])
    }

    await page.goto('https://linkedin.com')
    if (!cookiesExist){

        // First login without cookies
        await page.type('#session_key', process.env.LINKEDIN_USER)
        await page.type('#session_password', process.env.LINKEDIN_PASSWORD)
        await page.$eval('.sign-in-form__submit-button', (elem) => elem.click())
        await page.waitForNavigation()
        const cookies = await context.cookies();
        const cookieJson = JSON.stringify(cookies)  
        fs.writeFileSync('cookies.json', cookieJson)
    }
    await page.type(".search-global-typeahead__input",profileSearched)
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    let CURRENT_PAGE = 1
    let URL = `https://www.linkedin.com/search/results/people/?keywords=it%20recruiter&amp;origin=CLUSTER_EXPANSION&page=${CURRENT_PAGE}`
    await page.goto(URL)

   let counter = 0
   while (counter < cuantity){
        await page.waitForSelector('button')

        // search for "Conectar" span element inside button
        let connectSpan = await page.$$("//*[text()[contains(.,'Conectar')]]")
      for (span of connectSpan){
         
         // get parent element of span
         let button = await button.$('//..')

         // get name of person to add via Aria-label attribute of button
         let nombre = (await boton.getAttribute('aria-label')).split(' ')[2]
         await button.click()
         await page.waitForSelector("//*[text()[contains(.,'Añadir una nota')]]")
         let addNote = await page.$("//*[text()[contains(.,'Añadir una nota')]]")
         addNote.click()
         await page.waitForSelector('textarea')
        
         /// message to add on connect invite
         let message =  // AddyourpersonalMessage

         await page.type('textarea',message)
         await page.waitForSelector("//*[text()[contains(.,'Enviar')]]")
         let enviar = await page.$("//*[text()[contains(.,'Enviar')]]")
         await enviar.click()
         counter++
        }

        /// scroll to bottom of page
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
     
        /// go to next page
        CURRENT_PAGE++
        let URL = `https://www.linkedin.com/search/results/people/?keywords=it%20recruiter&amp;origin=CLUSTER_EXPANSION&page=${CURRENT_PAGE}`
        await page.goto(URL)
    }
} 

addProfiles({profileSearched: 'IT Recruiter', cuantity: '30', myName: addName})
