import express from 'express';
import supertest from 'supertest';
import { Express } from 'express';

function testServer(app: Express) {
  return supertest(app);
}

export default testServer;

