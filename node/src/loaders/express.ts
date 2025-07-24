import express, { Application } from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts"
import connectDB from "../config/database";
import routes from "../api/routes";
import init_admin from "../config/init_admin";


export default async (app: Application) => {
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(`${__dirname}/../../src/views`));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(expressLayouts);

    await connectDB()

    await init_admin()

    if (process.env.NODE_ENV == "production") {
        app.use(express.static(path.join(__dirname, '../../../react/dist')));

        const routes = [
            '/terms-and-conditions',
            "/sign-in",
            "/sign-up",
            "/u/requests",
            "/u/chat",
            "/g/chat",
            "/u/requests/pay",
            "/u/requests/pay/success",
            "/g/sign-up",
            "/g/sign-in",
            "/g/requests",
            "/g/employees",
            "/g/services",
            "/a/sign-in",
            "/a/garages",
            "/a/services",
            "/a/payments",
            "/a/users",
            "/a/requests",
            "/a/employees"
        ];

        app.get(routes, function (_, res) {
            res.sendFile(path.join(__dirname, '../../../react/dist', 'index.html'));
        });
    }

    routes(app);
};
