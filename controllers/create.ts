import { Request, Response } from "express";
import User from "../models";

export default async function( req: Request, res: Response ){
    const { email } = req.body;

    const _ = {
        email,
        liquidated_balance: 100,
        shares: 3
    }

    const user = new User(_);

    const newUser = await user.save();

    res.json({
        user: newUser
    })
}