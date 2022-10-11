import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { LicenseInfo } from '@mui/x-license-pro';

import 'Api/Firebase'

import App from "./App";

LicenseInfo.setLicenseKey(
  '83acb3ef467a6195c10e23f5ffb39f3fT1JERVI6NDAwMDUsRVhQSVJZPTE2NzkyNjU3OTkwMDAsS0VZVkVSU0lPTj0x',
);

ReactDOM.render(
    <Router>
        <App/>
    </Router>
, document.getElementById("root"));
