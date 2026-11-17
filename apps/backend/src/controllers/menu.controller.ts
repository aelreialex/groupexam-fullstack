import { type Request, type Response, type NextFunction } from "express";
import * as menuService from "../services/menu.service"
import { type Menu } from "@app/shared";
import { type ApiResponse } from "@app/shared";

export const getMenu = async( _req : Request, res : Response<ApiResponse<Menu>>, _next : NextFunction ) => {
    const result = await menuService.getMenu();

    return res.json({
        success: true,
        message: "Lyckat anrop",
        data: result
    })
}