import {Controller, Get} from "@nestjs/common";
import {StatesService} from "./states.service";

@Controller()
export class StatesController {
    private statesService;

    constructor(statesService: StatesService) {
        this.statesService = statesService;
    }

//localhost:3000/status
    @Get('status')
    getProducts() {
        return this.statesService.getAll();
    }

}