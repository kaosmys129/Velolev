"""
Generate a beautifully formatted official notice letter PDF for RoadSmart.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm, cm, inch
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Image, Table, TableStyle, KeepTogether, PageBreak
)
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Brand colors based on RoadSmart logo
BRAND_ORANGE = HexColor("#F39200")
BRAND_YELLOW = HexColor("#FFC107")
BRAND_PINK = HexColor("#E91E63")
BRAND_DARK = HexColor("#2C3E50")
BRAND_GRAY = HexColor("#5D6D7E")
BRAND_LIGHT = HexColor("#F8F9FA")
BRAND_ACCENT = HexColor("#FF6B35")

PAGE_WIDTH, PAGE_HEIGHT = A4
LEFT_MARGIN = 2.2 * cm
RIGHT_MARGIN = 2.2 * cm
TOP_MARGIN = 1.0 * cm
BOTTOM_MARGIN = 2.0 * cm

LOGO_PATH = "/Users/peterpc/Documents/liftpolemachine-web/roadsmart_logo.png"
OUTPUT_PDF = "/Users/peterpc/Documents/liftpolemachine-web/Official_Notice_Production_Suspension.pdf"


def draw_header_footer(canvas_obj, doc):
    """Draw the letterhead and footer on each page."""
    canvas_obj.saveState()

    # Top accent bar (gradient effect with overlapping rectangles)
    canvas_obj.setFillColor(BRAND_ORANGE)
    canvas_obj.rect(0, PAGE_HEIGHT - 4 * mm, PAGE_WIDTH, 4 * mm, fill=1, stroke=0)
    canvas_obj.setFillColor(BRAND_YELLOW)
    canvas_obj.rect(0, PAGE_HEIGHT - 4 * mm, PAGE_WIDTH / 3, 4 * mm, fill=1, stroke=0)
    canvas_obj.setFillColor(BRAND_PINK)
    canvas_obj.rect(0, PAGE_HEIGHT - 4 * mm, PAGE_WIDTH / 8, 4 * mm, fill=1, stroke=0)

    # Footer separator
    canvas_obj.setStrokeColor(BRAND_ORANGE)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(LEFT_MARGIN, 1.5 * cm, PAGE_WIDTH - RIGHT_MARGIN, 1.5 * cm)

    # Footer text - left
    canvas_obj.setFont("Helvetica", 8)
    canvas_obj.setFillColor(BRAND_GRAY)
    canvas_obj.drawString(
        LEFT_MARGIN, 1.1 * cm,
        "Shenzhen RoadSmart Lighting Co., Ltd.  |  International Business Department"
    )

    # Footer text - right (page number)
    canvas_obj.drawRightString(
        PAGE_WIDTH - RIGHT_MARGIN, 1.1 * cm,
        f"Page {doc.page}"
    )

    # Footer company line
    canvas_obj.setFont("Helvetica-Oblique", 7)
    canvas_obj.setFillColor(BRAND_GRAY)
    canvas_obj.drawCentredString(
        PAGE_WIDTH / 2, 0.7 * cm,
        "RoadSmart \u00ae  -  Smart Lighting Solutions for a Sustainable Future"
    )

    canvas_obj.restoreState()


def build_styles():
    """Create custom paragraph styles."""
    styles = getSampleStyleSheet()

    # Title style
    title = ParagraphStyle(
        "NoticeTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=26,
        textColor=BRAND_DARK,
        alignment=TA_CENTER,
        spaceBefore=2,
        spaceAfter=4,
    )

    # Subtitle (subject)
    subtitle = ParagraphStyle(
        "NoticeSubject",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=11.5,
        leading=15,
        textColor=BRAND_GRAY,
        alignment=TA_CENTER,
        spaceAfter=12,
    )

    # Meta label (left column)
    meta_label = ParagraphStyle(
        "MetaLabel",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.5,
        leading=13,
        textColor=BRAND_DARK,
        alignment=TA_LEFT,
    )

    # Meta value (right column)
    meta_value = ParagraphStyle(
        "MetaValue",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=13,
        textColor=HexColor("#333333"),
        alignment=TA_LEFT,
    )

    # Body text
    body = ParagraphStyle(
        "BodyText",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=15.5,
        textColor=HexColor("#2C3E50"),
        alignment=TA_JUSTIFY,
        spaceAfter=8,
    )

    # Greeting
    greeting = ParagraphStyle(
        "Greeting",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=14,
        textColor=HexColor("#2C3E50"),
        spaceBefore=4,
        spaceAfter=8,
    )

    # Section heading (e.g., "1. Production scheduling...")
    section_heading = ParagraphStyle(
        "SectionHeading",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=11.5,
        leading=15,
        textColor=BRAND_ORANGE,
        spaceBefore=10,
        spaceAfter=6,
    )

    # Section body
    section_body = ParagraphStyle(
        "SectionBody",
        parent=body,
        leftIndent=0,
        spaceAfter=6,
    )

    # Sub bullet item
    bullet_item = ParagraphStyle(
        "BulletItem",
        parent=body,
        leftIndent=18,
        bulletIndent=6,
        spaceAfter=3,
    )

    # Highlight (for the "effective from" sentence)
    highlight = ParagraphStyle(
        "Highlight",
        parent=body,
        fontName="Helvetica-Bold",
        textColor=BRAND_ACCENT,
        spaceBefore=4,
        spaceAfter=10,
        alignment=TA_CENTER,
    )

    # Closing paragraph
    closing = ParagraphStyle(
        "Closing",
        parent=body,
        spaceBefore=10,
    )

    # Signature name
    sig_name = ParagraphStyle(
        "SigName",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        textColor=BRAND_DARK,
        leading=14,
    )

    # Signature title
    sig_title = ParagraphStyle(
        "SigTitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        textColor=BRAND_GRAY,
        leading=13,
    )

    return {
        "title": title,
        "subtitle": subtitle,
        "meta_label": meta_label,
        "meta_value": meta_value,
        "body": body,
        "greeting": greeting,
        "section_heading": section_heading,
        "section_body": section_body,
        "bullet_item": bullet_item,
        "highlight": highlight,
        "closing": closing,
        "sig_name": sig_name,
        "sig_title": sig_title,
    }


def build_letter():
    """Build the letter content as a list of flowables."""
    s = build_styles()
    story = []

    # === LOGO ===
    if os.path.exists(LOGO_PATH):
        logo = Image(LOGO_PATH, width=7.5 * cm, height=2.7 * cm)
        logo.hAlign = "CENTER"
        story.append(logo)
        story.append(Spacer(1, 0.35 * cm))

    # === TITLE BLOCK ===
    story.append(Paragraph("OFFICIAL NOTICE OF", s["title"]))
    story.append(Paragraph("PRODUCTION SUSPENSION", s["title"]))
    story.append(Spacer(1, 0.15 * cm))

    # Decorative accent line
    accent_line = Table(
        [[""]],
        colWidths=[6 * cm],
        rowHeights=[2.2],
    )
    accent_line.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BRAND_ORANGE),
        ("LINEABOVE", (0, 0), (-1, -1), 0, white),
    ]))
    accent_line.hAlign = "CENTER"
    story.append(accent_line)
    story.append(Spacer(1, 0.4 * cm))

    # Subject
    subject_text = (
        "<b>Subject:</b> Suspension of Production Scheduling and Shipping "
        "Arrangement for the Mozambique Order"
    )
    story.append(Paragraph(subject_text, s["subtitle"]))
    story.append(Spacer(1, 0.2 * cm))

    # === META INFO BLOCK ===
    meta_data = [
        [Paragraph("<b>To</b>", s["meta_label"]),
         Paragraph("Mr. Carlos", s["meta_value"])],
        [Paragraph("<b>Company</b>", s["meta_label"]),
         Paragraph("Ecosys Energias Renov&aacute;veis, Lda.", s["meta_value"])],
        [Paragraph("<b>Project</b>", s["meta_label"]),
         Paragraph("Solar Street Light Order &ndash; Mozambique", s["meta_value"])],
        [Paragraph("<b>Destination Port</b>", s["meta_label"]),
         Paragraph("Nacala, Mozambique", s["meta_value"])],
        [Paragraph("<b>Date</b>", s["meta_label"]),
         Paragraph("14 July 2026", s["meta_value"])],
        [Paragraph("<b>Reference</b>", s["meta_label"]),
         Paragraph("RS-IB-2026-0714-MZ", s["meta_value"])],
    ]
    meta_table = Table(meta_data, colWidths=[4.0 * cm, 11.5 * cm])
    meta_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), BRAND_LIGHT),
        ("TEXTCOLOR", (0, 0), (0, -1), BRAND_DARK),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEABOVE", (0, 0), (-1, 0), 0.8, BRAND_ORANGE),
        ("LINEBELOW", (0, -1), (-1, -1), 0.8, BRAND_ORANGE),
        ("LINEBEFORE", (0, 0), (0, -1), 0.8, BRAND_ORANGE),
        ("BOX", (0, 0), (-1, -1), 0.5, BRAND_GRAY),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 0.5 * cm))

    # === GREETING ===
    story.append(Paragraph("Dear Carlos,", s["greeting"]))

    # === INTRO ===
    intro = (
        "This letter serves as an <b>official notice</b> regarding the current status of "
        "the above-mentioned solar street light order."
    )
    story.append(Paragraph(intro, s["body"]))

    para2 = (
        "Following your initial payment of <b>ZAR 200,000</b>, RoadSmart arranged and "
        "prepared the relevant battery raw materials specifically for this project. "
        "However, the required subsequent deposit has not yet been received, and no "
        "confirmed payment date or executable payment plan has been provided."
    )
    story.append(Paragraph(para2, s["body"]))

    para3 = (
        "Although we understand that you are currently waiting for payments from your "
        "side, the factory cannot continue reserving production capacity, manpower and "
        "supply-chain resources for an indefinite period without a confirmed production "
        "instruction."
    )
    story.append(Paragraph(para3, s["body"]))

    para4 = "Therefore, effective from the date of this notice:"
    story.append(Paragraph(para4, s["body"]))
    story.append(Spacer(1, 0.15 * cm))

    # === SECTION 1 ===
    sec1 = (
        "<b>1.&nbsp;&nbsp;Production scheduling has been officially suspended</b>"
    )
    body1a = (
        "The order has been removed from the factory's active and confirmed "
        "production schedule."
    )
    body1b = (
        "No production completion date, inspection date or delivery date is currently "
        "reserved or guaranteed."
    )
    story.append(Paragraph(sec1, s["section_heading"]))
    story.append(Paragraph(body1a, s["section_body"]))
    story.append(Paragraph(body1b, s["section_body"]))

    # === SECTION 2 ===
    sec2 = (
        "<b>2.&nbsp;&nbsp;The previous production and delivery timeline is no longer "
        "valid</b>"
    )
    body2 = (
        "Any production schedule, delivery commitment or estimated completion date "
        "previously discussed shall be considered cancelled and will need to be "
        "recalculated once the order is reactivated."
    )
    story.append(Paragraph(sec2, s["section_heading"]))
    story.append(Paragraph(body2, s["section_body"]))

    # === SECTION 3 ===
    sec3 = (
        "<b>3.&nbsp;&nbsp;Shipping schedules to Nacala will no longer be actively "
        "monitored or reserved</b>"
    )
    body3a = (
        "As the production schedule has been suspended, our team will no longer "
        "allocate time and resources to continuously monitor vessel schedules, freight "
        "rates, container availability or booking deadlines for shipments to "
        "<b>Nacala Port, Mozambique</b>."
    )
    body3b = (
        "Any previously discussed sailing schedule, estimated freight cost or shipping "
        "arrangement is therefore no longer guaranteed."
    )
    story.append(Paragraph(sec3, s["section_heading"]))
    story.append(Paragraph(body3a, s["section_body"]))
    story.append(Paragraph(body3b, s["section_body"]))

    # === SECTION 4 ===
    sec4 = (
        "<b>4.&nbsp;&nbsp;Freight costs and shipping availability will be reconfirmed "
        "later</b>"
    )
    body4 = (
        "Ocean freight rates and vessel availability are subject to market changes. "
        "When the order is ready to restart, the freight cost, sailing schedule, "
        "transit time and container arrangement must all be checked again based on the "
        "actual market conditions at that time."
    )
    story.append(Paragraph(sec4, s["section_heading"]))
    story.append(Paragraph(body4, s["section_body"]))

    # === SECTION 5 ===
    sec5 = "<b>5.&nbsp;&nbsp;Conditions for restarting the order</b>"
    body5 = "The order can only return to production planning after we receive:"
    story.append(Paragraph(sec5, s["section_heading"]))
    story.append(Paragraph(body5, s["section_body"]))
    story.append(Spacer(1, 0.05 * cm))

    bullets = [
        "A confirmed payment arrangement;",
        "The required subsequent deposit;",
        "A clear production instruction;",
        "Reconfirmation of factory capacity and raw material availability.",
    ]
    for item in bullets:
        story.append(Paragraph(f"&bull;&nbsp;&nbsp;{item}", s["bullet_item"]))

    story.append(Spacer(1, 0.1 * cm))
    restart = (
        "Once these conditions are fulfilled, RoadSmart will issue a new production "
        "and shipment schedule."
    )
    story.append(Paragraph(restart, s["section_body"]))
    story.append(Spacer(1, 0.15 * cm))

    # === CLOSING REMARKS ===
    closing1 = (
        "Please note that this notice <b>does not constitute a cancellation of the "
        "order</b>. The battery raw materials already prepared under the project will "
        "remain recorded against your order. However, the previous production "
        "priority, delivery timeline, freight rate and sailing schedule can no longer "
        "be retained."
    )
    story.append(Paragraph(closing1, s["body"]))

    closing2 = (
        "We sincerely value our long-term cooperation and remain willing to support "
        "the project once a clear and executable payment plan is available. At the "
        "same time, we must manage our factory capacity responsibly and prioritize "
        "orders with confirmed payments and production instructions."
    )
    story.append(Paragraph(closing2, s["body"]))

    closing3 = (
        "Please acknowledge receipt of this official notice."
    )
    story.append(Paragraph(closing3, s["body"]))

    story.append(Spacer(1, 0.5 * cm))

    # === SIGN-OFF ===
    story.append(Paragraph("Sincerely,", s["body"]))
    story.append(Spacer(1, 0.15 * cm))

    # Signature line (decorative)
    sig_line = Table(
        [[""]],
        colWidths=[5.5 * cm],
        rowHeights=[1.0],
    )
    sig_line.setStyle(TableStyle([
        ("LINEABOVE", (0, 0), (-1, -1), 0.7, BRAND_DARK),
    ]))
    story.append(sig_line)
    story.append(Spacer(1, 0.1 * cm))
    story.append(Paragraph("RoadSmart", s["sig_name"]))
    story.append(Paragraph("Shenzhen RoadSmart Lighting Co., Ltd.", s["sig_title"]))
    story.append(Paragraph("International Business Department", s["sig_title"]))

    return story


def main():
    doc = BaseDocTemplate(
        OUTPUT_PDF,
        pagesize=A4,
        leftMargin=LEFT_MARGIN,
        rightMargin=RIGHT_MARGIN,
        topMargin=TOP_MARGIN + 1.0 * cm,
        bottomMargin=BOTTOM_MARGIN,
        title="Official Notice of Production Suspension - Mozambique Order",
        author="RoadSmart - International Business Department",
        subject="Suspension of Production Scheduling and Shipping Arrangement",
    )

    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        showBoundary=0,
    )

    template = PageTemplate(id="letter", frames=[frame], onPage=draw_header_footer)
    doc.addPageTemplates([template])

    story = build_letter()
    doc.build(story)

    print(f"PDF created: {OUTPUT_PDF}")
    print(f"File size: {os.path.getsize(OUTPUT_PDF):,} bytes")


if __name__ == "__main__":
    main()
