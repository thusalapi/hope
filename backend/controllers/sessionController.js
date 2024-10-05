const express = require('express');
const Session = require('../models/Session');

const getDateRange = (option) => {
    const today = new Date();
    let startDate;

    switch (option) {
        case '7days':
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 7);
            break;
        case '1month':
            startDate = new Date(today);
            startDate.setMonth(today.getMonth() - 1);
            break;
        default:
            throw new Error('Invalid option');
    }

    // Format the dates to YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0'); // Month is 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    console.log("Date Range:", formatDate(startDate), formatDate(today));

    return {
        start: formatDate(startDate),
        end: formatDate(today)
    };
};

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
        const { option } = req.query;
        let sessions;

        console.log("Received Option:", option);

        if (option) {
            const { start, end } = getDateRange(option);
            console.log("Date Range:", start, end);
            sessions = await Session.find({
                date: { $gte: start, $lte: end }
            });
            console.log("Sessions found:", sessions);
        } else {
            sessions = await Session.find(req.query);
        }

        res.status(200).json(sessions);
    } catch (error) {
        console.error("Error fetching sessions:", error);
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
