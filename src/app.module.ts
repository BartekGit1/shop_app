import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductsModule} from './Produkt/products.module';
import {CategoryModule} from './Kategoria/category.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
// import {StatesModule} from "./Stan_Zamowienia/states.module";
import {OrdersModule} from "./Zamowienia/orders.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            database: 'ajitest',
            username: 'userlogin',
            password: 'userpassword',
            port: 5411,
            host: 'localhost',
            retryAttempts: 1,
            synchronize: true,
            entities: [__dirname + '/../**/*.entity.js'],
        }),
        ProductsModule,
        CategoryModule,
        // StatesModule,
        OrdersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
