import {  getTemplateService } from "./TemplateService";
export const GET_TEMPLATE = 'GET_TEMPLATE';
export const SET_TEMPLATE = 'SET_TEMPLATE';
export const GET_TEMPLATE_REQUEST = 'GET_TEMPLATE_REQUEST';
export const GET_TEMPLATE_SUCCESS = 'GET_TEMPLATE_SUCCESS';
export const GET_TEMPLATE_FAILURE = 'GET_TEMPLATE_FAILURE';
export const getTemplateAction = req => ({
    type: GET_TEMPLATE,
    req,
    promise: getTemplateService(req),
});

export const setTemplateAction = data => ({
    type: SET_TEMPLATE,
    data
});