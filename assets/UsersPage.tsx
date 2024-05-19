import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Main from './UsersPageComponents/Main'

const rootElement = document.getElementById('pp-demo-root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Main />
    </StrictMode>
);