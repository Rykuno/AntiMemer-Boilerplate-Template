import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlOptionalAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // Ignore APP_GUARD auth for if the request is http and not graphql
    if (context.getType() === 'http')
      return context.switchToHttp().getRequest();

    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  handleRequest(err, user, info) {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException();
    }

    if (err) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
