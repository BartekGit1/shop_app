import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {StatesService} from "./states.service";
import {OrderState} from "../entities/orderState.entity";
import {StatesController} from "./states.controller";

@Module({
    imports: [TypeOrmModule.forFeature([
        OrderState,
    ])
    ],
    controllers: [StatesController],
    providers: [StatesService]
})

export class StatesModule {
}