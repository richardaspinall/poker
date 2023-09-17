//importing modules
import express from 'express';
import { GameController } from './GameController';

//initiating the router
export const router = express.Router();

router.post('/', GameController.createGame);

router.post('/playerReady', GameController.playerReady);

router.post('/playerSit', GameController.playerSit);

router.post('/playerStand', GameController.playerStand);

router.post('/playerFold', GameController.playerFold);

router.post('/playerCheck', GameController.playerCheck);

router.post('/playerCall', GameController.playerCall);

router.post('/playerRaise', GameController.playerRaise);
