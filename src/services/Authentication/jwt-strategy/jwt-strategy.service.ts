import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {jwtConstants} from "../../../static/private/constants";

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor() {
        super({
            //логика проверки запросов от клиента
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}