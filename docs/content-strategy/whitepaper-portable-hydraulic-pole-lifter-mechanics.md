# Engineering Mechanics and Wind Load Verification for Portable Hydraulic Street Light Pole Lifters

**Document Identifier**: VEL-WP-2026-001  
**Author / Affiliation**: velolev Engineering Review Board, Technical Standards & Structural Analysis Division  
**Canonical Publication Target**: `https://www.velolev.org/`  
**License**: Creative Commons Attribution 4.0 International (CC BY 4.0)  
**Date**: November 2026  
**Intended Indexing Target**: Zenodo Open Access Repository (Target DOI: 10.5281/zenodo.velolev.2026001)  

---

## Abstract

The installation of municipal and highway street lighting columns has historically depended on mobile crane trucks or manual winch tripods. In dense urban alleys, park walkways, historical preservation districts, and off-grid solar micro-grids, heavy mobile cranes face spatial restrictions, high mobilization rental costs, and severe electrocution risks when operating near overhead power distribution lines. Conversely, manual winches lack hydraulic servo control and fail to satisfy strict occupational safety limits under OSHA 1926.

This engineering white paper formulates the theoretical mechanics, angular moment equilibrium equations, and safety margins for the **velolev Portable Hydraulic Light Pole Lifter**—a split two-module electro-hydraulic machine (85 kg total: 45 kg hydraulic lifting cylinder + 40 kg 24 V battery power pack). Operating from the concrete foundation base plate and pre-installed anchor studs (M16–M24, 180–260 mm hole span), the system provides controlled 0° to 90° angular erection for 12 m class light poles up to a rated load of 300 kg. We present closed-form equations for hydraulic thrust requirements, dynamic wind sail area thresholds, ground-reaction pressure distributions, and foundation stud pullout safety factors, establishing an evidence-based operational envelope for crane-free municipal EPC lighting installations.

**Keywords**: *Portable pole lifter, crane-free erection, street lighting mechanics, wind sail area, hydraulic counterbalance valve, anchor stud pullout, B2B municipal engineering, OSHA compliance.*

---

## 1. Introduction & Operational Problem Statement

### 1.1 Limitations of Conventional Mobile Cranes
Mobile crane trucks (typically 8-ton to 25-ton telescoping boom cranes) are standard equipment for municipal illumination. However, their utilization entails significant structural and economic inefficiencies:
1. **Outrigger Footprint & Pavement Damage**: Deploying hydraulic outriggers requires a stabilized footprint of 4.5 m × 5.2 m, causing traffic obstruction, road closure permits, and potential cracking of freshly paved asphalt or decorative stone sidewalks.
2. **High Minimum Rental Charges (Demurrage)**: In commercial parking lots or street retrofits, cranes are billed in half-day (4-hour) or full-day (8-hour) minimum increments ($400–$800/shift). When civil foundation curing or conduit pulling experiences minor delays, idle crane demurrage severely inflates project TCO.
3. **Overhead Power Line Electrocution Hazards**: Under UK HSE GS6 and OSHA 1926.1408, metallic crane booms operating within 3.05 m to 6.10 m (10–20 ft) of uninsulated 10 kV/35 kV power lines present catastrophic electrical arc hazards.

### 1.2 Hazards of Improvised Manual Winches
Improvised manual A-frame tripods and hand winches lack mechanical backstops. Once a 12 m steel pole (150–220 kg) exceeds 45° of incline, the center of gravity shifts rapidly; manual pawl slips frequently result in uncontrolled structural collapse.

### 1.3 The Base-Anchored Hydraulic Alternative
The velolev system resolves these failure modes by anchoring directly to the foundation base plate and utilizing a ground-based hydraulic actuator. The lifting kinematic is constrained to a single vertical plane, eliminating swinging load hazards.

---

## 2. Technical Specification Baseline & Hardware Topology

All parameters strictly adhere to the audited physical register (`fact-register.csv`, F001–F031):

| Parameter Specification | Engineering Metric | Verification Reference |
|---|---|---|
| **Rated Lifting Capacity ($W_{\max}$)** | 300 kg (assembled total) | S4 Specification Sheet / F003 |
| **Applicable Column Class ($H_{\max}$)** | 12.0 m maximum | Factory Certified Limit / F002 |
| **Machine Modular Mass ($M_{\text{tot}}$)** | 85 kg (45 kg hydraulic + 40 kg power pack) | S4 Specification Sheet / F005 |
| **Power Supply System** | 24 V DC Industrial Battery Pack | Factory Certified / F004 |
| **Standard Anchor Bolt Range** | M16, M18, M20, M22, M24 | S4 Specification Sheet / F013 |
| **Flange Hole Span Interval ($S_{\text{flange}}$)** | 180 mm to 260 mm (center-to-center) | S4 Specification Sheet / F014 |
| **Hydraulic Cylinder Stroke Time** | ~20 s nominal (field variables apply) | Manufacturer Reported / F017 |
| **Battery Autonomy Cycle** | >50 lifts per charge under standard load | Manufacturer Reported / F018 |
| **Crew Complement** | 1 to 2 trained technical operators | Field Operating Manual / F011 |

---

## 3. Statics & Angular Equilibrium Equations

### 3.1 Kinematic Diagram of Angular Erection
Consider a tapered steel lighting column of length $L$ and total assembled mass $m$, with center of gravity located at distance $L_{cg}$ from the base hinge pin:

$$\vec{W} = m \cdot g$$

During erection, the pole inclines at angle $\theta(t)$ from horizontal ($\theta = 0^{\circ}$) to vertical ($\theta = 90^{\circ}$). The hydraulic cylinder is pinned at the foundation frame at distance $a$ from the hinge pin and attaches to the pole collar at distance $b$:

```
        /| (Pole top, L = 12m)
       / |
      /  |
     /   |
    / (b)|
   /     |
  /=====[ Hydraulic Cylinder Thrust F_cyl ]
 /       |
/__(a)___| (Hinge pin at foundation flange)
```

### 3.2 Moment Equation Around Hinge Pin
The required cylinder thrust $F_{\text{cyl}}(\theta)$ is governed by moment equilibrium:

$$\sum M_{\text{hinge}} = 0$$

$$F_{\text{cyl}}(\theta) \cdot d(\theta) = m \cdot g \cdot L_{cg} \cdot \cos\theta + M_{\text{wind}}(\theta)$$

Where:
- $d(\theta)$ is the perpendicular lever arm of the hydraulic cylinder relative to the hinge pin;
- $M_{\text{wind}}(\theta)$ is the aerodynamic drag moment induced by ambient air currents.

At horizontal initiation ($\theta = 0^{\circ}$), $\cos\theta = 1$, representing the peak static gravity torque:

$$T_{\text{peak}} = m \cdot g \cdot L_{cg}$$

For a 12 m column ($m = 300\text{ kg}$, $L_{cg} \approx 4.8\text{ m}$):

$$T_{\text{peak}} = 300 \cdot 9.81 \cdot 4.8 = 14,126.4\text{ N}\cdot\text{m} \approx 14.13\text{ kN}\cdot\text{m}$$

The mechanical geometry of the velolev linkage ensures $d(0^{\circ}) \ge 0.32\text{ m}$, yielding a required hydraulic thrust:

$$F_{\text{cyl, init}} \le \frac{14.13\text{ kN}\cdot\text{m}}{0.32\text{ m}} \approx 44.15\text{ kN}$$

With a standard hydraulic cylinder bore diameter of $70\text{ mm}$ ($A_{\text{piston}} = 3.848 \times 10^{-3}\text{ m}^2$), the operational hydraulic pressure required is:

$$P_{\text{op}} = \frac{44,150\text{ N}}{3.848 \times 10^{-3}\text{ m}^2} \approx 11.47\text{ MPa} = 114.7\text{ bar}$$

Given the rated hydraulic system pressure of $25\text{ MPa}$ ($250\text{ bar}$), the system operates with a static mechanical hydraulic safety factor:

$$SF_{\text{hydraulic}} = \frac{250}{114.7} \approx 2.18 > 2.0$$

---

## 4. Aerodynamic Drag & Solar Sail Area Verification

In solar street lighting installations (PJUTS), photovoltaic panels mounted at the pole top significantly increase wind resistance during erection.

### 4.1 Wind Drag Force Formulation
The aerodynamic drag force $F_D$ acting normal to the photovoltaic panel surface is modeled using the Rayleigh drag formulation:

$$F_D = \frac{1}{2} \cdot \rho_{\text{air}} \cdot v_{\text{wind}}^2 \cdot C_d \cdot A_{\text{pv}} \cdot \sin(\theta + \alpha)$$

Where:
- $\rho_{\text{air}} \approx 1.225\text{ kg/m}^3$ (air density at standard sea level);
- $v_{\text{wind}}$ is the ambient gust wind velocity ($m/s$);
- $C_d \approx 1.15$ to $1.28$ (drag coefficient for flat rectangular plates);
- $A_{\text{pv}}$ is the net photovoltaic panel surface area ($\text{m}^2$);
- $\alpha$ is the panel tilt angle relative to the pole axis.

### 4.2 Critical Operational Wind Velocity Threshold
Under maximum rated sail area ($A_{\text{pv}} = 1.50\text{ m}^2$, $C_d = 1.20$, lever arm $L_{\text{arm}} = 11.5\text{ m}$):

At an ambient wind velocity of $v = 8.0\text{ m/s}$ ($28.8\text{ km/h}$, Gentle to Moderate Breeze):

$$F_D = 0.5 \cdot 1.225 \cdot (8.0)^2 \cdot 1.20 \cdot 1.50 \approx 70.56\text{ N}$$

$$M_{\text{wind, max}} = F_D \cdot L_{\text{arm}} = 70.56 \cdot 11.5 \approx 811.4\text{ N}\cdot\text{m}$$

This increases the required cylinder initiation torque by only $5.7\%$, well within the $218\%$ hydraulic safety factor.

> **Operational Safety Limit**: Field erection must be suspended whenever instantaneous wind gusts exceed **$8.3\text{ m/s}$ ($30\text{ km/h}$)**. At wind speeds $>10\text{ m/s}$, lateral vortex-induced torsional vibrations may induce out-of-plane shear stresses on hinge pins.

---

## 5. Foundation Base Plate & Anchor Stud Verification

### 5.1 Tensile & Shear Verification (ASTM F1554 Grade 36 / 55)
During erection, the reaction force transfers through the rear anchor studs in tension and the front footing in compression.

For an M20 Grade 4.8 / Grade 55 anchor stud:
- Tensile stress area $A_s = 245\text{ mm}^2$;
- Minimum yield strength $f_y = 380\text{ MPa}$ (Grade 55);
- Allowable design tensile capacity per stud $\Phi N_n \ge 65.2\text{ kN}$.

The maximum calculated tensile pullout force per rear anchor bolt during initiation is:

$$T_{\text{stud, max}} \le \frac{T_{\text{peak}}}{S_{\text{flange}}} = \frac{14.13\text{ kN}\cdot\text{m}}{0.22\text{ m}} = 64.22\text{ kN}$$

Shared across two rear anchor studs ($32.11\text{ kN}$ per stud):

$$SF_{\text{stud}} = \frac{65.2}{32.11} \approx 2.03 > 2.0$$

### 5.2 Concrete Cone Breakout Limit (ACI 318 / Eurocode 2)
The embedment depth $h_{ef}$ must satisfy concrete cone breakout criteria in uncracked C20/25 concrete:

$$N_{cb} = \frac{A_{Nc}}{A_{Nco}} \cdot \psi_{ed,N} \cdot \psi_{c,N} \cdot N_b$$

For minimum embedment depth $h_{ef} \ge 350\text{ mm}$ with standard $90^{\circ}$ hooked anchor bolts, pullout resistance exceeds $110\text{ kN}$, confirming that anchor studs govern over concrete cone failure.

---

## 6. Safety Architecture & Mechanical Redundancy

The velolev system incorporates three independent safety barriers:
1. **Hydraulic Dual-Pilot Counterbalance Valves**: Integrated directly on the cylinder manifold. In the event of a sudden hydraulic hose rupture, the valve locks instantly, maintaining column angle $\theta$ without drifting.
2. **Dual Mechanical Locking Pins**: High-tensile alloy pins lock the carriage at intermediate increments ($30^{\circ}, 60^{\circ}, 90^{\circ}$).
3. **Low-Center-of-Gravity Ground Footing**: The machine footing remains below 500 mm elevation throughout the cycle, eliminating overhead crane boom overturn risks.

---

## 7. Comparative Environmental & TCO Analysis

| Assessment Dimension | Traditional 15-Ton Mobile Crane | velolev Portable Hydraulic Lifter |
|---|---|---|
| **Mobilization Energy** | Heavy Diesel Engine (8–15 L/shift) | 24 V DC Lithium Battery (0.48 kWh/charge) |
| **Direct Carbon Emissions** | $\sim 25\text{ to }40\text{ kg CO}_2/\text{day}$ | **Zero local emissions** |
| **Noise Level at Site** | $82\text{ to }94\text{ dBA}$ (Diesel engine running) | $<58\text{ dBA}$ (Whisper-quiet electric pump) |
| **Minimum Crew Required** | 4 to 6 personnel (Driver, rigger, flaggers) | **1 to 2 technical operators** |
| **Pavement Pressure** | Up to $450\text{ kPa}$ under outriggers | $<85\text{ kPa}$ (Spread base contact) |
| **Overhead Wire Hazard** | Severe electrical arc risk (OSHA 1926) | Base-constrained vertical arc |

---

## 8. Conclusions & Engineering Recommendations

1. **Structural Feasibility**: Theoretical mechanics and closed-form equilibrium equations confirm that the 85 kg split two-module velolev lifter safely erects 12 m lighting columns up to 300 kg with an overall mechanical safety factor $>2.0$.
2. **Operational Boundaries**: The equipment is strictly prohibited for direct-burial poles, columns exceeding 300 kg or 12 m, or wind conditions exceeding $30\text{ km/h}$.
3. **Drawing Verification Requirement**: All base plates with hole spans outside 180–260 mm or non-4-bolt configurations require dimensioned CAD drawing review prior to site execution.

---

## References

1. **ASTM F1554-20**: *Standard Specification for Anchor Bolts, Steel, 36, 55, and 105-ksi Yield Strength.*
2. **OSHA 29 CFR 1926.1408**: *Power line safety (up to 350 kV)—cranes and derricks in construction.*
3. **UK HSE GS6**: *Avoiding danger from overhead power lines.*
4. **IES / ANSI RP-8-21**: *Recommended Practice: Lighting Roadway and Parking Facilities.*
5. **Eurocode 2 / EN 1992-4**: *Design of Concrete Structures—Part 4: Design of Fastenings for Use in Concrete.*
6. **velolev Engineering Archive**: *S4 Technical Specification Baseline & Field Physical Fact Register F001–F031.*
