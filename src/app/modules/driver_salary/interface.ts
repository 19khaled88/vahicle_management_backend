import { SalaryProcess } from "@prisma/client";

export const driver_salary_fields_constant = ['driver_id', 'status']

type Driver = {
        id: string;
        join_date: Date;
        name: string,
        email: string,
        address: string,
        avatar: string,
        experience: string,
        phone: string
}

export type IDriverSalaryResponse = {
        id: string;
        driver_id: string;
        amount: number;
        currency: string;
        description: string | null;
        status: SalaryProcess; // Make sure `SalaryProcess` is properly imported
        driver: Driver;
        createdAt: Date;
        updatedAt: Date;


}