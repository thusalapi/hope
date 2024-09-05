const express = require('express');
const Session = require('../models/Session');

const createSession = async (req, res) => {
    try {
        const session = new Session(req.body);
        await session.save();
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find(req.query);
        res.status(200).json(sessions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json(session);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndDelete(req.params.id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.status(200).json({ message: 'Session deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createSession,
    getSessions,
    getSessionById,
    updateSession,
    deleteSession
};
