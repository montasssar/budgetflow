"use client";
import {
  Chart as C,
  LineElement, BarElement, ArcElement,
  CategoryScale, LinearScale, PointElement,
  Tooltip, Legend
} from "chart.js";

// Register ONCE here to avoid double-registration warnings
C.register(LineElement, BarElement, ArcElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default C;
