export class utils {
    public static hash(content: string) {
        let crypto = require('crypto');  //加载crypto库
        let SecrectKey = 'axios';//秘钥；
        let Signture = crypto.createHmac('sha1', SecrectKey);//定义加密方式
        Signture.update(content);
        return Signture.digest().toString('base64');//生成的密文后将再次作为明文再通过pbkdf2算法迭代加密；
    }
}