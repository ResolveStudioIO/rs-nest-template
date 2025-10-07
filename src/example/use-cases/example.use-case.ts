import { Injectable } from '@nestjs/common';

import { ExampleOutputType } from '../types';

@Injectable()
export class ExampleUseCase {
    public execute(): ExampleOutputType {
        return { ok: true, msg: 'Hello from rs-nest-template' };
    }
}
