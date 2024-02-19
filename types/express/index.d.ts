
import express from "express";

declare global {
    namespace Express {
       interface Request {
        user?: Record<string,any>
        // extra variables you want to use in req object
      }
    }
  
  }