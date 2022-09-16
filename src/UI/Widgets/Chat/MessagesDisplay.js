import { useState, useCallback } from 'react';
import {
    Stack,
    List,
    CircularProgress,
} from "@mui/material";

import Button from 'UI/Widgets/Buttons/Button';
import { PanelDropdown } from 'UI/Layouts/Panel';
import { TextMessage } from 'UI/Widgets/Chat';
import { useBottomScrollListener } from 'Hooks/useBottomScrollListener';
import RenderIf from '../RenderIf';

const messagesTest = [
    {
        "id": "lGvrLSkjkvGM",
        "message_type": "twitter",
        "text": "testing with placeholder",
        "created_at": "2022-08-16T12:34:38Z",
        "direction": "out",
        "media": {},
        "platform": {
            "id": 1,
            "name": "Twitter"
        },
        "placeholders": {},
        "recipient_media": {}
    },
    {
        "id": "NODAbSdDdaKe",
        "message_type": "twitter",
        "text": "testing message with media",
        "created_at": "2022-08-16T11:17:22Z",
        "direction": "out",
        "media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        },
        "platform": {
            "id": 1,
            "name": "Twitter"
        },
        "placeholders": {},
        "recipient_media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        }
    },
    {
        "id": "NODAbSdDdaKe",
        "message_type": "twitter",
        "text": "testing message with media",
        "created_at": "2022-08-16T11:17:22Z",
        "direction": "out",
        "media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        },
        "platform": {
            "id": 1,
            "name": "Twitter"
        },
        "placeholders": {},
        "recipient_media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        }
    },
    {
        "id": "NODAbSdDdaKe",
        "message_type": "twitter",
        "text": "testing message with media",
        "created_at": "2022-08-16T11:17:22Z",
        "direction": "out",
        "media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        },
        "platform": {
            "id": 1,
            "name": "Twitter"
        },
        "placeholders": {},
        "recipient_media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        }
    },
    {
        "id": "NODAbSdDdaKe",
        "message_type": "twitter",
        "text": "testing message with media",
        "created_at": "2022-08-16T11:17:22Z",
        "direction": "out",
        "media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        },
        "platform": {
            "id": 1,
            "name": "Twitter"
        },
        "placeholders": {},
        "recipient_media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        }
    },
    {
        "id": "NODAbSdDdaKe",
        "message_type": "twitter",
        "text": "testing message with media",
        "created_at": "2022-08-16T11:17:22Z",
        "direction": "out",
        "media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        },
        "platform": {
            "id": 1,
            "name": "Twitter"
        },
        "placeholders": {},
        "recipient_media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        }
    },
    {
        "id": "NODAbSdDdaKe",
        "message_type": "twitter",
        "text": "testing message with media",
        "created_at": "2022-08-16T11:17:22Z",
        "direction": "out",
        "media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        },
        "platform": {
            "id": 1,
            "name": "Twitter"
        },
        "placeholders": {},
        "recipient_media": {
            "id": 408580,
            "name": "",
            "file_type": "image/jpeg",
            "urls": {
                "thumb": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/3e3a49cec5fc86825a379c3a2bee2a3dbe91cc43c9375bc621e0f47b84fd6a2d?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b0bc084d074ea5fc1d1599d2f9087f44c2e08265dc4d6a4c3a519b7ed2e51862",
                "medium": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/2f86c865efb26180349f76823b92737eed86a96b4b38366b41d41b03821ea74e?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=1760e40f57724c3e6f48ac51ccc973a9931c7c4c73dec594da8b63a8acdf2438",
                "large": "https://stakdsocial.s3.us-east-2.amazonaws.com/variants/mbfuz5629i12ll11qq6eqclufwp8/c53bebb6aebdbf656c90eeb0c13aa4ab4b28cd7337ecbead73456c2831e8b93f?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=214cc74573bc9a2bd745db27efa578bfdb8e36b20b876990b531bbe303e58361",
                "original": "https://stakdsocial.s3.us-east-2.amazonaws.com/mbfuz5629i12ll11qq6eqclufwp8?response-content-disposition=inline%3B%20filename%3D%22FY1na7lX0AElIWd.jpeg%22%3B%20filename%2A%3DUTF-8%27%27FY1na7lX0AElIWd.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJF7DFXH2NIHI3MLA%2F20220818%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20220818T132900Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=5af8397e033642404931d8e3c371968c7948c983caa7451aba233d4a43193c5f"
            },
            "hashid": "kXeoGFaJeGjJ"
        }
    },
    {
        "id": "lGvrLSkjkvGM",
        "message_type": "twitter",
        "text": "testing with placeholder",
        "created_at": "2022-08-16T12:34:38Z",
        "direction": "in",
        "media": {},
        "platform": {
            "id": 1,
            "name": "Twitter"
        },
        "placeholders": {},
        "recipient_media": {}
    },
]

export const MessagesDisplay = (props) => {
    const { messages,
        contact_profile_image,
        coach_profile_image,
    } = props;

    const scrollRef = props.onScrollEnd ? useBottomScrollListener(props.onScrollEnd,0,true) : null;

    const [checkedMessagesIds, setCheckedMessagesIds] = useState([])
    const [showActions, setShowActions] = useState(false)

    const onActionClick = () => {
        setShowActions(true)
    }

    const onCancelClick = () => {
        setCheckedMessagesIds([])
        setShowActions(false)
    }

    const onCheckMessages = (message) => {
        checkedMessagesIds.includes(message) ?
            setCheckedMessagesIds(checkedMessagesIds.filter(m => m !== message)) :
            setCheckedMessagesIds([...checkedMessagesIds, message])
    }

    const isMessageChecked = useCallback((message) => {
        return checkedMessagesIds.some(m => m.id === message.id)
    }, [checkedMessagesIds])

    return (
        <>
            {props.actions && (
                <Stack /* actions */
                    direction="row"
                    justifyContent="space-between"
                >
                    <Button sx={{
                        visibility: showActions ? "visible" : "hidden",
                    }}
                        name="Cancel"
                        variant="text"
                        onClick={onCancelClick}
                    />
                    {checkedMessagesIds.length === 0 ?
                        <Button
                            name="Action"
                            variant="text"
                            onClick={onActionClick}
                        />
                        :
                        <PanelDropdown
                            action={{
                                name: 'Action',
                                variant: 'text',
                                options: props.actions || [],
                            }}
                        />
                    }
                </Stack>
            )}

            <List // messages list
                ref={scrollRef}
                sx={{
                    flex: '1 0 0',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    overscrollBehaviorBlock: 'contain',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    '::-webkit-scrollbar': {
                        width: '5px',
                        background: 'transparent',
                    },

                    '::-webkit-scrollbar-thumb': {
                        background: (theme) => theme.palette.grey[400],
                    }
                }}
            >
                {messages && messages.map((message, index) => (
                    <TextMessage
                        key={message.id}
                        owner={message.direction === 'out'}
                        onCheck={onCheckMessages}
                        checked={isMessageChecked(message)}
                        message={message}
                        actionActive={showActions}
                        owmnerAvatar={coach_profile_image}
                        contactAvatar={contact_profile_image}
                    />
                ))}
                <RenderIf condition={props.loading}>
                    <CircularProgress size={20} sx={{ mx: "auto" }} />
                </RenderIf>
            </List>
        </>
    )
}
