import {IAquarium} from "@/src/interfaces/IAquarium";

export type IAquariumAction =
    | {
    type: "set/init_value";
    payload: IAquarium;
}
    | {
    type: "set/color";
    payload: string; // Hex color value
}
    | { type: "set/ledStart"; payload: string }
    | { type: "set/ledStop"; payload: string }
    | { type: "set/fluoStart"; payload: string }
    | { type: "set/fluoStop"; payload: string };
