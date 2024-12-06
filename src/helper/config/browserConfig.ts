import{Browser,
    BrowserContext,
    Page,
    LaunchOptions,
    BrowserContextOptions,
    Cookie,
    firefox

} from 'playwright';


let browser:Browser;
let bctx:BrowserContext;
let page:Page;

loadEnv();

export const firefoxBrowserOptions:LaunchOptions={
    headless: process.env.Headless==='true',
    args:["--start-maximized"],

};

export const chromeBrowserOptions:LaunchOptions={
    slowMo:1500,
    headless: process.env.Headless==='true',
    devtools:false,
    logger:{
        isEnabled:(name,severity)=>name==="api",
        log:(name,severity,message,args)=>console.log(`${name} ${message}`)
    },
    channel:"chrome",
    args:["--start-maximized","--disable-extension","--disable-plugins","--disable-dev-shm-usage","--no-sandbox"],
};
export const edgeBrowserOptions:LaunchOptions={
    channel:"msedge",
    headless: process.env.Headless==='true',
    args:["--start-maximized"],

};

export const browserContextOptions:BrowserContextOptions={
    viewport:{
        width:Number.parseInt(process.env.VIEWPORT_WIDTH as string),
        height:Number.parseInt(process.env.VIEWPORT_HEIGHT as string),
    },
    recordHar:{
        path:'request.har',
        mode:'full',
        urlFilter:''
    },
    javaScriptEnabled: true,
    ignoreHTTPSErrors:true,
    acceptDownloads:true,
    recordVideo:false ? {dir:"./test-results/videos"}:undefined,
};

export function loadEnv(){
    const env=process.env.npm_config_env||"dev";
    require("dotenv").config({path:`./env.${env}`});
}

export function getBrowserCookieValue(array:Cookie[],cookieName:string){
    for(const cookie of array){
       const cookiename=cookie
        if(cookie.name.toUpperCase()===cookieName){
            return cookie.value;
        }
    }
}