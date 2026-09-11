import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type {
  ContentMediaLayout,
  ContentMediaButton,
} from "@/app/lib/wordpress/grapgql/pages";

import ActionButton from "@/app/components/common/ActionButton";

type ContentMediaSectionProps = {
  section: ContentMediaLayout;

  primaryLogoUrl?: string | null;
  primaryLogoAlt?: string | null;
};

/* =========================================================
   HELPERS
========================================================= */

function getOption(
  value:
    | string
    | string[]
    | null
    | undefined,
  fallback: string
) {
  if (!value) {
    return fallback;
  }

  const option =
    Array.isArray(value)
      ? value[0]
      : value;

  if (!option) {
    return fallback;
  }

  return String(option)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
}

/* =========================================================
   IMAGE POSITION
========================================================= */

function getImagePosition(
  value:
    | string
    | string[]
    | null
) {
  const position = getOption(
    value,
    "center"
  );

  if (position.includes("top")) {
    return "object-top";
  }

  if (position.includes("bottom")) {
    return "object-bottom";
  }

  if (position.includes("left")) {
    return "object-left";
  }

  if (position.includes("right")) {
    return "object-right";
  }

  return "object-center";
}

/* =========================================================
   CONTENT WIDTH
========================================================= */

function getContentWidth(
  value:
    | string
    | string[]
    | null
){
  const width = getOption(
    value,
    "medium"
  );

  if (
    width.includes("narrow") ||
    width.includes("small")
  ) {
    return "max-w-[520px]";
  }

  if (
    width.includes("wide") ||
    width.includes("large")
  ) {
    return "max-w-[760px]";
  }

  return "max-w-[640px]";
}

/* =========================================================
   LAYOUT
========================================================= */

function getLayout(
  value:
    | string
    | string[]
    | null
) {
  const layout = getOption(
    value,
    "image_left"
  );

  if (layout.includes("right")) {
    return "image_right";
  }

  if (layout.includes("text")) {
    return "text_only";
  }

  if (layout.includes("profile")) {
    return "profile";
  }

  return "image_left";
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ContentMediaSection({
  section,
  primaryLogoUrl,
  primaryLogoAlt = "Logo",
}: ContentMediaSectionProps) {
  const layout = getLayout(
    section.layout
  );

  const imagePosition =
    getImagePosition(
      section.imagePosition
    );

  const contentWidth =
    getContentWidth(
      section.contentWidth
    );

  /* =======================================================
     FOREGROUND IMAGE
  ======================================================= */

  const imageUrl =
    section.image?.node?.sourceUrl ||
    section.image?.node?.mediaItemUrl ||
    null;

  const imageAlt =
    section.image?.node?.altText ||
    section.heading ||
    "";

  /* =======================================================
     BACKGROUND IMAGE
  ======================================================= */

  const backgroundImageUrl =
    section.backgroundImage?.node
      ?.sourceUrl ||
    section.backgroundImage?.node
      ?.mediaItemUrl ||
    null;

  /* =======================================================
     COLORS
  ======================================================= */

  const backgroundColor =
    section.backgroundColor ||
    "#ffffff";

  const textColor =
    section.textColor ||
    "#222222";

  /* =======================================================
     CONDITIONS
  ======================================================= */

  const hasImage =
    Boolean(imageUrl) &&
    layout !== "text_only";

const stats = (section.stats ?? []).filter(
  (stat) =>
    Boolean(stat?.value) ||
    Boolean(stat?.label)
);

const shouldShowStats =
  Boolean(section.showStats) &&
  stats.length > 0;

  const hasButtons =
    Boolean(section.buttons?.length);

  const imageRight =
    layout === "image_right";

  /* =======================================================
     BACKGROUND GRADIENT
  ======================================================= */

  const desktopGradient = imageRight
    ? `
      linear-gradient(
        to left,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0) 14%,
        rgba(255,255,255,1) 60%,
        rgba(255,255,255,1) 100%
      )
    `
    : `
      linear-gradient(
        to right,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0) 14%,
        rgba(255,255,255,1) 60%,
        rgba(255,255,255,1) 100%
      )
    `;
    const mobileGradient = imageRight
    ? `
      linear-gradient(
        to left,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,.7) 14%,
        rgba(255,255,255,1) 60%,
        rgba(255,255,255,1) 100%
      )
    `
    : `
      linear-gradient(
        to right,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,.7) 14%,
        rgba(255,255,255,1) 60%,
        rgba(255,255,255,1) 100%
      )
    `;

  /* =======================================================
     TEXT ONLY
  ======================================================= */

  if (layout === "text_only") {
    return (
      <section
        className="
          relative
           w-full
        "
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        <div
          className="
            relative
            overflow-hidden
            px-5
            py-[90px]
            sm:px-8
            md:py-[120px]
            lg:px-12
            lg:py-[150px]
          "
        >
          {backgroundImageUrl && (
            <>
              <div className="absolute inset-0">
                <Image
                  src={
                    backgroundImageUrl
                  }
                  alt=""
                  fill
                  sizes="100vw"
                  className="
                    object-cover
                    object-center
                  "
                />
              </div>

              <div
                className="
                  absolute
                  inset-0
                  bg-white/85
                "
              />
            </>
          )}

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-[1440px]
            "
          >
            <div
              className={`
                mx-auto
                text-center
                ${contentWidth}
              `}
            >
              {section.eyebrow && (
                <Eyebrow>
                  {section.eyebrow}
                </Eyebrow>
              )}

              {section.heading && (
                <Heading>
                  {section.heading}
                </Heading>
              )}

              {section.content && (
                <Content
                  html={
                    section.content
                  }
                />
              )}

              {hasButtons && (
                <Buttons
                  buttons={
                    section.buttons ||
                    []
                  }
                  centered
                />
              )}
            </div>
          </div>
        </div>

        {shouldShowStats && (
          <StatsSection
            stats={stats}
            logoUrl={
              primaryLogoUrl
            }
            logoAlt={
              primaryLogoAlt ||
              "Logo"
            }
          />
        )}
      </section>
    );
  }

  /* =======================================================
     IMAGE + CONTENT
  ======================================================= */

  return (
    <section
      className="
        relative
        overflow-hidden
      "
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {/* =================================================
          TOP IMAGE + CONTENT AREA
      ================================================= */}

      <div
        className="
          relative
          isolate
          overflow-hidden
          border-b-[5px]
          border-[#b89a55]
        "
      >
        {/* ===============================================
            COMPLETE BACKGROUND IMAGE
        =============================================== */}

        {backgroundImageUrl && (
          <div
            className="
              absolute
              inset-0
              -z-30
            "
          >
            <Image
              src={
                backgroundImageUrl
              }
              alt=""
              fill
              sizes="100vw"
              className="
                object-cover
                object-center
              "
            />
          </div>
        )}

        {/* ===============================================
            DESKTOP WHITE GRADIENT
        =============================================== */}

        {backgroundImageUrl && (
          <div
            className="
              absolute
              inset-0
              -z-20
              hidden
              lg:block
            "
            style={{
              background:
                desktopGradient,
            }}
          />
        )}

        {/* ===============================================
            MOBILE BACKGROUND OVERLAY
        =============================================== */}

        {backgroundImageUrl && (
          <div
            className="
              absolute
              inset-0
              -z-20
              bg-white/80
              lg:hidden
            "
             style={{
              background:
                mobileGradient,
            }}
          />
        )}

        {/* ===============================================
            MAIN GRID
        =============================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            w-full
            max-w-[1600px]
            grid-cols-1

            lg:min-h-[650px]
            lg:grid-cols-2
          "
        >
          {/* =============================================
              FOREGROUND PORTRAIT
          ============================================= */}

          {hasImage && (
            <div
              className={`
                relative
                flex
                min-h-[500px]
                items-end
                justify-center
                overflow-hidden
                px-5
                pt-10

                sm:min-h-[600px]
                sm:px-10

                lg:min-h-[650px]
                lg:px-6
                lg:pt-0

                ${
                  imageRight
                    ? "lg:order-2"
                    : "lg:order-1"
                }
              `}
            >
              <div
                className="
                  relative
                  h-[480px]
                  w-full
                  max-w-[520px]

                  sm:h-[580px]
                  sm:max-w-[600px]

                  lg:h-[650px]
                  lg:max-w-[650px]
                "
              >
                <Image
                  src={imageUrl!}
                  alt={imageAlt}
                  fill
                  sizes="
                    (max-width: 1024px)
                    90vw,
                    45vw
                  "
                  className={`
                    object-contain
                    object-bottom
                    ${imagePosition}
                  `}
                />
              </div>
            </div>
          )}

          {/* =============================================
              CONTENT
          ============================================= */}

          <div
            className={`
              relative
              flex
              items-center

              px-6
              py-[70px]

              sm:px-10
              sm:py-[85px]

              md:px-14
              bg-white/50
              md:bg-transparent
              lg:px-[5vw]
              lg:py-[85px]

              xl:px-[6vw]

              ${
                imageRight
                  ? "lg:order-1"
                  : "lg:order-2"
              }

              ${
                !hasImage
                  ? "lg:col-span-2"
                  : ""
              }
            `}
          >
            <div
              className={`
                w-full
                ${contentWidth}
              `}
            >
              {section.eyebrow && (
                <Eyebrow>
                  {section.eyebrow}
                </Eyebrow>
              )}

              {section.heading && (
                <Heading>
                  {section.heading}
                </Heading>
              )}

              {section.content && (
                <Content
                  html={
                    section.content
                  }
                />
              )}

              {hasButtons && (
                <Buttons
                  buttons={
                    section.buttons ||
                    []
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          FULL WIDTH STATS UNDER CONTENT SECTION
      ================================================= */}

       {shouldShowStats && (
      <StatsSection
        stats={stats}
        logoUrl={primaryLogoUrl}
        logoAlt={
          primaryLogoAlt || "Logo"
        }
      />
    )}
    </section>
  );
}

/* =========================================================
   EYEBROW
========================================================= */

function Eyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      className="
        mb-5
        font-body
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.3em]
        opacity-70

        md:text-[11px]
      "
    >
      {children}
    </p>
  );
}

/* =========================================================
   HEADING
========================================================= */

function Heading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2
      className="
        max-w-[760px]
        font-heading
        text-[44px]
        font-light
        leading-[1]
        tracking-[-0.025em]

        sm:text-[52px]

        md:text-[58px]

        lg:text-[60px]

        xl:text-[64px]
      "
    >
      {children}
    </h2>
  );
}

/* =========================================================
   CONTENT
========================================================= */

function Content({
  html,
}: {
  html: string;
}) {
  return (
    <div
      className="
        mt-7
        font-body
        text-[14px]
        font-normal
        leading-[1.75]
        opacity-90

        md:text-[15px]

        [&_a]:underline
        [&_a]:underline-offset-4

        [&_blockquote]:border-l
        [&_blockquote]:border-current
        [&_blockquote]:pl-5

        [&_h2]:mb-4
        [&_h2]:mt-8
        [&_h2]:font-heading
        [&_h2]:text-[34px]

        [&_h3]:mb-3
        [&_h3]:mt-7
        [&_h3]:font-heading
        [&_h3]:text-[28px]

        [&_li]:mb-2

        [&_ol]:my-5
        [&_ol]:list-decimal
        [&_ol]:pl-5

        [&_p+p]:mt-5

        [&_strong]:font-semibold

        [&_ul]:my-5
        [&_ul]:list-disc
        [&_ul]:pl-5
      "
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}

/* =========================================================
   BUTTONS
========================================================= */

/* =========================================================
   BUTTONS
========================================================= */

function Buttons({
  buttons,
  centered = false,
}: {
  buttons: ContentMediaButton[];

  centered?: boolean;
}) {
  /*
   * IMPORTANT:
   *
   * Normal button:
   * needs buttonLabel + buttonLink
   *
   * Contact button:
   * only needs buttonLabel.
   * Modal buttons do NOT need buttonLink.
   */

  const validButtons =
    buttons.filter(
      (button) => {
        if (
          !button.buttonLabel
        ) {
          return false;
        }

        /*
         * Contact button can work
         * without buttonLink.
         */
        if (
          button.isContactButton
        ) {
          return true;
        }

        /*
         * Normal button must have
         * normal link.
         */
        return Boolean(
          button.buttonLink
        );
      }
    );

  if (!validButtons.length) {
    return null;
  }

  return (
    <div
      className={`
        mt-9
        flex
        flex-wrap
        gap-4

        ${
          centered
            ? "justify-center"
            : ""
        }
      `}
    >
      {validButtons.map(
        (button, index) => (
          <ActionButton
            key={`${button.buttonLabel}-${index}`}
            button={button}
            className="
              group
              inline-flex
              min-h-[54px]
              items-center
              justify-center
              gap-3

              bg-[#b89a55]
              px-8

              font-body
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white

              transition-all
              duration-300

              hover:bg-[#222]
            "
          >
            <span>
              {
                button.buttonLabel
              }
            </span>

            <ArrowUpRight
              size={14}
              strokeWidth={1.4}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </ActionButton>
        )
      )}
    </div>
  );
}

/* =========================================================
   STAT ITEM
========================================================= */

function StatItem({
  value,
  label,
  className = "",
}: {
  value: string | null;
  label: string | null;
  className?: string;
}) {
  return (
    <div
      className={`
        flex
        min-h-[150px]
        flex-col
        items-center
        justify-center
        px-5
        text-center

        ${className}
      `}
    >
      {value && (
        <div
          className="
            font-heading
            text-[48px]
            font-light
            leading-none
            tracking-[-0.035em]
            text-[#111]

            sm:text-[56px]

            lg:text-[64px]
          "
        >
          {value}
        </div>
      )}

      {label && (
        <div
          className="
            mt-3
            max-w-[180px]
            whitespace-pre-line

            font-heading
            text-[15px]
            font-medium
            uppercase
            leading-[1.6]
            tracking-[0.12em]

            text-[#111]
          "
        >
          {label}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   CENTER LOGO
========================================================= */

function StatsLogo({
  logoUrl,
  logoAlt,
}: {
  logoUrl?: string | null;
  logoAlt: string;
}) {
  if (!logoUrl) {
    return null;
  }

  return (
    <div
      className="
        flex
        items-center
        justify-center
        px-6
        py-8
      "
    >
      <div
        className="
          relative
          h-[100px]
          w-[150px]

          sm:h-[120px]
          sm:w-[180px]

          lg:h-[135px]
          lg:w-[200px]
        "
      >
        <Image
          src={logoUrl}
          alt={logoAlt}
          fill
          sizes="200px"
          className="
            object-contain
            object-center
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   STATS SECTION
========================================================= */

function StatsSection({
  stats,
  logoUrl,
  logoAlt,
}: {
  stats: {
    value: string | null;
    label: string | null;
  }[];

  logoUrl?: string | null;
  logoAlt: string;
}) {
  const count = stats.length;

  if (!count) {
    return null;
  }

  /* =======================================================
     TWO STATS
     STAT | LOGO | STAT
  ======================================================= */

  if (count === 2) {
    return (
      <div
        className="
          relative
          z-20
          mt-4
          bg-white
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1400px]
            grid-cols-1

            sm:grid-cols-3
          "
        >
          <StatItem
            value={stats[0].value}
            label={stats[0].label}
            className="
              sm:border-r
              sm:border-[#b89a55]/60
            "
          />

          <StatsLogo
            logoUrl={logoUrl}
            logoAlt={logoAlt}
          />

          <StatItem
            value={stats[1].value}
            label={stats[1].label}
            className="
              sm:border-l
              sm:border-[#b89a55]/60
            "
          />
        </div>
      </div>
    );
  }

  /* =======================================================
     THREE STATS
     STAT | STAT | STAT
  ======================================================= */

  if (count === 3) {
    return (
      <div
        className="
          relative
          z-20
          border-t-[5px]
          border-[#b89a55]
          bg-white
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1400px]
            grid-cols-1

            sm:grid-cols-3
          "
        >
          {stats.map(
            (stat, index) => (
              <StatItem
                key={`${stat.value}-${index}`}
                value={stat.value}
                label={stat.label}
                className={`
                  ${
                    index > 0
                      ? "sm:border-l sm:border-[#b89a55]/60"
                      : ""
                  }
                `}
              />
            )
          )}
        </div>
      </div>
    );
  }

  /* =======================================================
     FOUR STATS

     STAT             STAT

             LOGO

     STAT             STAT
  ======================================================= */

  if (count === 4) {
    return (
      <div
        className="
          relative
          z-20
          border-t-[5px]
          border-[#b89a55]
          bg-white
          py-5

          sm:py-8
        "
      >
        <div
          className="
            mx-auto
            max-w-[1200px]
          "
        >
          {/* TOP TWO */}

          <div
            className="
              grid
              grid-cols-1

              sm:grid-cols-2
            "
          >
            <StatItem
              value={
                stats[0].value
              }
              label={
                stats[0].label
              }
              className="
                sm:border-r
                sm:border-[#b89a55]/60
              "
            />

            <StatItem
              value={
                stats[1].value
              }
              label={
                stats[1].label
              }
            />
          </div>

          {/* CENTER LOGO */}

          <div
            className="
              mx-auto
              my-1
              flex
              max-w-[260px]
              items-center
              justify-center

              border-y
              border-[#b89a55]/40
            "
          >
            <StatsLogo
              logoUrl={logoUrl}
              logoAlt={logoAlt}
            />
          </div>

          {/* BOTTOM TWO */}

          <div
            className="
              grid
              grid-cols-1

              sm:grid-cols-2
            "
          >
            <StatItem
              value={
                stats[2].value
              }
              label={
                stats[2].label
              }
              className="
                sm:border-r
                sm:border-[#b89a55]/60
              "
            />

            <StatItem
              value={
                stats[3].value
              }
              label={
                stats[3].label
              }
            />
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     FALLBACK FOR 1 OR 5+ STATS
  ======================================================= */

  return (
    <div
      className="
        relative
        z-20
        border-t-[5px]
        border-[#b89a55]
        bg-white
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1400px]
          grid-cols-1

          sm:grid-cols-2

          lg:grid-cols-3
        "
      >
        {stats.map(
          (stat, index) => (
            <StatItem
              key={`${stat.value}-${index}`}
              value={stat.value}
              label={stat.label}
              className="
                border-b
                border-[#b89a55]/30

                sm:border-r
              "
            />
          )
        )}
      </div>
    </div>
  );
}