import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models";

export default async function( req: Request, res: Response ){
    const payload = req.body as WebhookPayload;


    if(payload.status === "success"){
        const session = await mongoose.startSession();
        session.startTransaction();

        try{
            await User.findByIdAndUpdate(payload.merchant_id, {
                $inc: {
                  shares: -payload.no_shares,
                  liquidated_balance: payload.amount,
                },
              },{ session });
       
              throw new Error("an error occured");
       
              await User.findByIdAndUpdate(payload.buyer_id, {
                $inc: {
                  shares: payload.no_shares,
                  liquidated_balance: -payload.amount,
                },
              }, { session });
       
              return res.send("success");
        }catch(e: any){

           await session.abortTransaction();
           session.endSession();

           console.error(e);
           return res.send("error_occured");
           
        }
    }

    res.send("failed");


    


}

interface WebhookPayload {
    status: "success" | "failed",
    amount: number,
    no_shares: string;
    buyer_id: string;
    merchant_id: string;
} 