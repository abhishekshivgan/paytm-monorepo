"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransactions(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session.user.id;
    if (!userId) {
        return {
            msg: "User not logged in"
        }
    }

    try {
        await prisma.onRampTransaction.create({
            data: {
                userId: Number(userId),
                amount: amount,
                status: "Processing",
                startTime: new Date(),
                provider,
                token
            }
        })
    } catch (err) {

    }
}