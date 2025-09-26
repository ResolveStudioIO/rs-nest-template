import { Injectable } from '@nestjs/common';

import { ExampleOutputType } from '../types';

@Injectable()
export class ExampleUseCase {
    public execute(): ExampleOutputType {
        return { ok: true, msg: 'Привет из rs-nest-template' };
    }
}
