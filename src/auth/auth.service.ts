import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { argon2d, argon2i, hash, verify } from "argon2";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signIn() {
        return { msg: "Sign In" };
    }


    async signUp(dto: AuthDto) {

        //Hash the pass
        const hashedPass = await hash(dto.password);
        // Store email and pass in DB
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: hashedPass,
            },
        });

        delete (user as any).hash; // 



        return { user }
    }



}