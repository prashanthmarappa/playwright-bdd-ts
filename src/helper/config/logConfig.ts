import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import winston from 'winston';

const Logger= winston.createLogger({
    transports:[
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.uncolorize({level:true,message:true,raw:true}),
                winston.format.timestamp({format:`YYYY-MM-DD HH:mm:ss`}),
                winston.format.align(),
                winston.format.printf((info)=>`${info.timestamp} ${info.level}:${info.message}`),
            ),
        }),

        new winston.transports.File({
            filename:`reports/execution.log`,
            format:winston.format.combine(
                winston.format.uncolorize({level:true,message:true,raw:true}),
                winston.format.timestamp({format:`YYYY-MM-DD HH:mm:ss`}),
                winston.format.align(),
                winston.format.printf((info)=>`${info.timestamp} ${info.level}:${info.message}`),
            ),
        }),
    ],
});

const TEST_SEPARATOR="#########################################################";

export default class Log{
    /**
     * name
     */
    public static testBegin(scenario:string):void {
        this.printLogs(`Scenario: ${scenario} - started`,TEST_SEPARATOR);
    }

    public static testEnd(scenario:string,status:string):void {
        this.printLogs(`Scenario: ${scenario} - ${status}`,TEST_SEPARATOR);
    }

    public static info(msg:string):void{
        Logger.info(msg);
    }

    public static error(msg:string):void{
        Logger.error(msg);
    }

    private static printLogs(msg:string,seperator:string){
        Logger.info(seperator);
        Logger.info(`${msg.toUpperCase()}`);
        Logger.info(seperator);
    }

    public static attachText(attach: ICreateAttachment, msg:string):void{
        Logger.info(msg);
        attach(msg);
    }
}