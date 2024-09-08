import { SetMetadata } from '@nestjs/common';

export const IS_SECURED_IDENTIFIER = 'isSecured';
export const Secured = () => SetMetadata(IS_SECURED_IDENTIFIER, true);
