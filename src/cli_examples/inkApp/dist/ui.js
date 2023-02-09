"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const ink_table_1 = __importDefault(require("ink-table"));
const App = () => {
    const [counter, setCounter] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const timer = setInterval(() => {
            setCounter(previousCounter => previousCounter + 1);
        }, 100);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const data = [
        {
            name: 'Sosa Saunders',
            gender: 'male',
            age: counter,
            email: 'sosa.saunders@mail.com',
            phone: '+1 (809) 435-2786',
        },
        {
            name: 'Angelina Kirk',
            gender: 'female',
            age: 3,
            email: 'angelina@kirk.io',
            phone: '+1 (870) 567-3516',
        },
        {
            name: 'Bradford Rosales',
            gender: 'male',
            age: 20,
            email: 'bradfordrosales@fast.com',
            phone: '+1 (918) 573-3240',
        },
        {
            name: 'Gwen Schroeder',
            gender: 'female',
            age: 17,
            email: 'gwen@corp.xyz',
            phone: '+1 (987) 417-2062',
        },
        {
            name: 'Ellison Mann',
            gender: 'male',
            age: 5,
            email: 'ellisonmann@katakana.com',
            phone: '+1 (889) 411-2186',
        },
    ];
    return (react_1.default.createElement(ink_1.Box, null,
        react_1.default.createElement(ink_1.Box, { marginTop: 1 },
            react_1.default.createElement(ink_1.Box, { borderStyle: "round", borderColor: "green" },
                react_1.default.createElement(ink_1.Text, null,
                    counter,
                    " tests passed")),
            react_1.default.createElement(ink_table_1.default, { data: data }))));
};
module.exports = App;
exports.default = App;
