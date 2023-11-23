export interface Login{
  email: string,
  password: string,
  role: string

}

export interface Task{
title:string,
userId:string,
image:object
description:string,
deadline:Date,
}
