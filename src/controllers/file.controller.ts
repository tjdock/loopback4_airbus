import {
  requestBody,
  RestBindings,
  post,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import * as multer from 'multer';
import {Count, repository, Where} from '@loopback/repository';
import {GeneralInfoRepository} from '../repositories';
import {GeneralInfo} from '../models';
import {Request, Response} from "express";

let XLSX = require('xlsx');

export class FileController {
    constructor(
        @repository(GeneralInfoRepository)
        public generalInfoRepository: GeneralInfoRepository,
    ) {
    }

    /**
     * 导入 ac summary xlsx
     * @param request
     * @param response
     */
    @post('/import-summary', {
        responses: {
            200: {
                content: {'application/json': {schema: {type: 'object'}}},
                description: ''
            }
        }
    })
    async importSummary(
        @requestBody({
            description: 'multipart/form-data value.',
            required: true,
            content: {
                'multipart/form-data': {'x-parser': 'stream',schema: {type: 'object'}}
            }
        })
        request: Request,
        @inject(RestBindings.Http.RESPONSE) response: Response,
    ): Promise<Object> {
        const storage = multer.memoryStorage();
        const upload = multer({storage});

        return new Promise<object>((resolve, reject) => {
            upload.any()(request, response, async err => {
                if (err) return reject(err);

                try {
                    let workbook = XLSX.read((<any>request.files)[0].buffer, {
                        type: 'buffer',
                    });
                    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

                    let range = XLSX.utils.decode_range(worksheet['!ref']);

                    for (let rowNum = 2; rowNum <= range.e.r; rowNum = rowNum + 13) {
                        let msn = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 1})];
                        let cgcNotified = worksheet[XLSX.utils.encode_cell({r: rowNum + 9, c: 3})];
                        let cgcActual = worksheet[XLSX.utils.encode_cell({r: rowNum + 9, c: 4})];
                        let cafNotified = worksheet[XLSX.utils.encode_cell({r: rowNum + 10, c: 3})];
                        let cafActual = worksheet[XLSX.utils.encode_cell({r: rowNum + 10, c: 4})];
                        let tacNotified = worksheet[XLSX.utils.encode_cell({r: rowNum + 11, c: 3})];
                        let tacActual = worksheet[XLSX.utils.encode_cell({r: rowNum + 11, c: 4})];
                        let totNotified = worksheet[XLSX.utils.encode_cell({r: rowNum + 12, c: 3})];
                        let totActual = worksheet[XLSX.utils.encode_cell({r: rowNum + 12, c: 4})];

                        console.log('行=', rowNum, '列=', 1, 'msn=', msn.v, 'cgc=', cgcNotified);

                        let temp = new GeneralInfo();
                        let tempmsn = /\d+/.exec(msn.v); //只取数字
                        if (tempmsn != null) {
                            temp.msn = +tempmsn[0];
                        }
                        let program = await FileController.GetProgramByMSN(msn.v);
                        if (program === '') {
                            temp.program = 'SA';
                        } else {
                            temp.program = program;
                        }

                        if (typeof cgcNotified !== 'undefined') {
                            temp.cgcNotified = (await FileController.GetDateValue(cgcNotified.w)) || undefined;
                        }
                        if (typeof cgcActual !== 'undefined') {
                            temp.cgcActual = (await FileController.GetDateValue(cgcActual.w)) || undefined;
                        }
                        if (typeof cafNotified !== 'undefined') {
                            temp.cafNotified = (await FileController.GetDateValue(cafNotified.w)) || undefined;
                        }
                        if (typeof cafActual !== 'undefined') {
                            temp.cafActual = (await FileController.GetDateValue(cafActual.w)) || undefined;
                        }
                        if (typeof tacNotified !== 'undefined') {
                            temp.tacNotified = (await FileController.GetDateValue(tacNotified.w)) || undefined;
                        }
                        if (typeof tacActual !== 'undefined') {
                            temp.tacActual = (await FileController.GetDateValue(tacActual.w)) || undefined;
                        }
                        if (typeof totNotified !== 'undefined') {
                            temp.totNotified = (await FileController.GetDateValue(totNotified.w)) || undefined;
                        }
                        if (typeof totActual !== 'undefined') {
                            temp.totActual = (await FileController.GetDateValue(totActual.w)) || undefined;
                        }

                        let where: Where = {"msn": temp.msn};
                        let c: Count = await this.generalInfoRepository.count(where);
                        if (c.count == 0) {
                            //添加
                            await this.generalInfoRepository.create(temp);
                            console.log('添加了一条数据');
                        } else {
                            //修改
                            await this.generalInfoRepository.updateAll(temp, where);
                            console.log('修改了一条数据');
                        }

                    }

                    resolve({status: 1});
                } catch (error) {
                    return reject(error);
                }
            });
        });
    }

    /**
     * 导入 delivery team xlsx
     * @param request
     * @param response
     */
    @post('/import-team', {
        responses: {
            200: {
                content: {'application/json': {schema: {type: 'object'}}},
                description: ''
            }
        }
    })
    async importTeam(
        @requestBody({
            description: 'multipart/form-data value.',
            required: true,
            content: {
                'multipart/form-data': {'x-parser': 'stream',schema: {type: 'object'}}
            }
        })
            request: Request,
        @inject(RestBindings.Http.RESPONSE) response: Response,
    ): Promise<Object> {
        const storage = multer.memoryStorage();
        const upload = multer({storage});

        return new Promise<object>((resolve, reject) => {
            upload.any()(request, response, async err => {
                if (err) return reject(err);

                try {
                    let workbook = XLSX.read((<any>request.files)[0].buffer, {
                        type: 'buffer',
                    });
                    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

                    let range = XLSX.utils.decode_range(worksheet['!ref']);

                    for (let rowNum = 1; rowNum <= range.e.r; rowNum++) {
                        let comboString: string = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 2})].v;
                        let delCADM = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 3})];
                        let delGTE = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 5})];
                        let delCIM = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 6})];
                        let delADQM = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 7})];
                        let delCM = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 8})];
                        let delIACE = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 9})];
                        let delDTM = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 10})];
                        let delSCM = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 11})];
                        let delFTE = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 16})];
                        let delFFM = worksheet[XLSX.utils.encode_cell({r: rowNum, c: 13})];

                        if (comboString == "") {
                            break;
                        }

                        let TempArray: Array<string> = comboString.split('/');
                        let msn = TempArray[0];
                        console.log('行=', rowNum, '列=', 1, 'msn=', comboString);

                        let temp = new GeneralInfo();
                        let tempmsn = /\d+/.exec(msn); //只取数字
                        if (tempmsn != null) {
                            temp.msn = +tempmsn[0];
                        }
                        let program = await FileController.GetProgramByMSN(msn);
                        if (program === '') {
                            temp.program = 'SA';
                        } else {
                            temp.program = program;
                        }
                        temp.customerOwner = TempArray[2];
                        temp.customerOperator = TempArray.length == 4 ? TempArray[3] : TempArray[2];//如果是3段，CustomerOwner=CustomerOperator
                        if (typeof delCADM !== 'undefined') {
                            temp.delCADM = delCADM.v || undefined;
                        }
                        if (typeof delGTE !== 'undefined') {
                            temp.delGTE = delGTE.v || undefined;
                        }
                        if (typeof delCIM !== 'undefined') {
                            temp.delCIM = delCIM.v || undefined;
                        }
                        if (typeof delADQM !== 'undefined') {
                            temp.delADQM = delADQM.v || undefined;
                        }
                        if (typeof delCM !== 'undefined') {
                            temp.delCM = delCM.v || undefined;
                        }
                        if (typeof delIACE !== 'undefined') {
                            temp.delIACE = delIACE.v || undefined;
                        }
                        if (typeof delDTM !== 'undefined') {
                            temp.delDTM = delDTM.v || undefined;
                        }
                        if (typeof delSCM !== 'undefined') {
                            temp.delSCM = delSCM.v || undefined;
                        }
                        if (typeof delFTE !== 'undefined') {
                            temp.delFTE = delFTE.v || undefined;
                        }
                        if (typeof delFFM !== 'undefined') {
                            temp.delFFM = delFFM.v || undefined;
                        }

                        let where: Where = {"msn": temp.msn};
                        let c: Count = await this.generalInfoRepository.count(where);
                        if (c.count == 0) {
                            //添加
                            await this.generalInfoRepository.create(temp);
                            console.log('添加了一条数据');
                        } else {
                            //修改
                            await this.generalInfoRepository.updateAll(temp, where);
                            console.log('修改了一条数据');
                        }
                    }

                    resolve({status: 1});
                } catch (error) {
                    return reject(error);
                }
            });
        });
    }

    /**
     * 根据msn返回program
     * @param msn
     * @constructor
     */
    private static async GetProgramByMSN(msn: string) {
        msn += ''; //如果纯数字，强制转换为字符
        if (msn.startsWith('L') || msn.startsWith('l')) {
            return 'LR';
        }
        if (msn.startsWith('N') || msn.startsWith('n')) {
            return 'SA';
        }
        return '';
    }

    /**
     * 转换日期格式yyyy-mm-dd
     * @param date
     * @constructor
     */
    private static async GetDateValue(date: string) {
        date += '';
        if (date !== '') {
            let y = date.split('/')[2];
            let m = date.split('/')[1];
            let d = date.split('/')[0];
            return new Date(`${y}-${m}-${d}`).toISOString();
        } else {
            return undefined;
        }
    }
}


