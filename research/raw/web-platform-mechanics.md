# How short-form virality works in 2025-2026: platform mechanics, policies and finance rules

**Prepared for:** Back of the Envelope / "Envelope Math" (new, zero-subscriber, faceless finance-math channel on YouTube Shorts, Instagram Reels and TikTok)
**Research date:** 2026-10-07
**Scope:** ranking signals, view counting, length, hooks, loops, captions, Trial Reels, posting frequency, how new channels break out, originality / reused / AI-content rules, monetization thresholds, and finance-specific rules (FTC, platform policies, finfluencer regulation).
**Method:** about 60 web searches (standard and "extended" modes). No vidIQ credits were used.

**Read this first: sourcing caveat.** Every WebFetch attempt in this session was refused by the network egress proxy (blog.youtube, support.google.com, support.tiktok.com, creators.instagram.com, socialmediatoday.com, tubefilter.com, buffer.com, ftc.gov, opus.pro, vidiq.com, kapwing.com, ppc.land). So I could not open any page directly. Each claim below comes from search-engine result summaries of the linked page, and the link is inline. I labelled each claim by evidence strength:

- **[OFFICIAL]**: the platform or regulator itself, or a named executive quoted in press coverage of an official announcement.
- **[DATA]**: a third-party study with a stated sample, such as Buffer, Socialinsider, OpusClip, Adobe or Verizon/Publicis.
- **[3P]**: a third-party blog or marketer claim with no visible method. Treat it as a hypothesis.
- **[UNVERIFIED]**: a claim that appears only on SEO/marketing blogs and conflicts with, or goes beyond, the official statements. Do not build on it.

Before anything goes into public-facing copy, spot-check the high-stakes items (YPP thresholds, the October 2026 Shorts originality update, the Instagram April 2026 originality rule) against the primary pages.

---

## 0. TL;DR: the twelve mechanics that matter most for Envelope Math

1. **All three platforms start every post with a small test audience and widen it in steps.** Follower count is not the gate. TikTok says follower count and past hits are not direct For You factors ([TechCrunch on TikTok's official explainer](https://techcrunch.com/2020/06/18/tiktok-explains-how-the-recommendation-system-behind-its-for-you-feed-works)). Instagram shows a post "to a small audience" and then to wider audiences as it performs ([TechCrunch, Apr 30 2024](https://techcrunch.com/2024/04/30/instagram-is-updating-its-ranking-systems-to-surface-more-content-from-smaller-original-creators)). YouTube's Shorts lead describes the system finding a "seed audience" ([MediaPost](https://www.mediapost.com/publications/article/388588/)). **A zero-subscriber channel can break out on its first good post.** [OFFICIAL]
2. **The first decision is "stay or swipe", and the platforms now report it directly.** YouTube shows "Viewed vs. swiped away" / "Stayed to watch" ([Search Engine Journal](https://www.searchenginejournal.com/youtube-explains-how-shorts-algorithm-works/494953/)). Instagram added **Skip rate**, the share of viewers who leave in the first 3 seconds, in Aug 2025 ([Metricool](https://metricool.com/instagram-reel-analytics/)). The hook has to work within 1-3 seconds. [OFFICIAL/3P]
3. **Instagram's top three signals are watch time, likes per reach and sends per reach.** Sends (DM shares) matter most for reaching non-followers ([Social Media Today, Jan 2025](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/); [Social Samosa](https://www.socialsamosa.com/news-2/instagram-reveals-key-factors-for-boosting-reach-8646916)). **Design every Envelope Math reel to be sent to a friend** ("send this to the friend who…"). [OFFICIAL]
4. **TikTok's strongest stated signal is completion.** Its official explainer says "whether a user finishes watching a longer video" is a strong signal ([TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/)). [OFFICIAL]
5. **View counting changed.** Since Mar 31 2025 a YouTube Shorts view counts when playback starts, and **replays count as new views**. The old metric now lives on as "Engaged views", which monetization still uses ([Tubefilter](https://www.tubefilter.com/2025/03/26/youtube-shorts-views-counting-stats/); [Pixability](https://www.pixability.com/uncategorized/whats-changing-with-shorts-organic-views/)). Since **Aug 24 2026**, YouTube counts views from the first frame on every format ([Tubefilter, Aug 18 2026](https://www.tubefilter.com/2026/08/18/youtubes-now-counting-public-views-from-the-first-frame-hoping-inflated-numbers-will-help-creators-negotiate-brand-deals/); [MediaNama](https://www.medianama.com/2026/08/223-youtube-counts-views-first-frame-monetisation/)). **Public view counts are now reach numbers. Judge your work by Engaged views and Stayed-to-watch.** [OFFICIAL]
6. **Originality is now enforced in recommendations on all three platforms.** The changes so far:
   - YouTube YPP "inauthentic content" rule, Jul 15 2025 ([Plagiarism Today](https://www.plagiarismtoday.com/2025/07/08/youtube-targets-inauthentic-content/)).
   - YouTube Shorts recommendations update, **Oct 1 2026**. Rene Ritchie said that "VO descriptions of what's happening on screen, minor technical edits, or template-based bulk changes" do not make reused clips original ([Relevant Audience](https://www.relevantaudience.com/youtube/youtube-shorts-original-content-reach-update/); [Android Headlines](https://www.androidheadlines.com/2026/10/youtube-cuts-reach-reuploaded-shorts-originality-push.html)).
   - Instagram aggregator removal for Reels (Apr 2024), extended to photos and carousels on **Apr 30 2026** ([TechCrunch](https://techcrunch.com/2026/04/30/instagram-restricts-reach-of-content-aggregators-in-new-crackdown/); [Tubefilter](https://tubefilter.com/2026/04/30/instagram-removes-algorithm-recommendations-repost-content-aggregator)).
   - TikTok For You eligibility excludes unoriginal and watermarked re-uploads ([Online Optimism](https://onlineoptimism.com/blog/updates-tiktoks-community-guidelines)).

   **Envelope Math's own calculations, scripts and animations are the moat. Do not build on clipped TV or other creators' footage.** [OFFICIAL]
7. **"AI slop" is a stated 2026 YouTube priority.** Neal Mohan's 2026 letter commits to reducing low-quality AI content ([eWeek](https://www.eweek.com/de/news/youtube-ai-slop-crackdown-creators/); [Digit](https://www.digit.in/features/general/youtube-ceo-reducing-ai-slop-videos-enhancing-kids-and-teen-content-key-focus-in-2026.html/amp/)). TikTok added an "AI" slider in Manage Topics so users can turn AI content down ([TechRepublic](https://www.techrepublic.com/article/news-tiktok-ai-content/)). A faceless channel is fine. A templated, mass-produced one is not. [OFFICIAL]
8. **Length depends on the platform.**
   - YouTube Shorts: creators surveyed favour **under 30 s** for views and shares ([Adobe Express survey of 507 creators](https://www.adobe.com/express/learn/blog/youtube-shorts-length-study)).
   - Instagram: Reels of **45-60 s** had the highest median views in a ~140k-Reel sample ([Socialinsider](https://socialinsider.io/blog/instagram-reels-length/)).
   - TikTok: videos **over 60 s** got 43.2% more reach in Buffer's 1.1M-video sample ([Buffer](https://buffer.com/resources/longer-tiktoks-get-more-views-data/)), and only videos over 1 minute qualify for Creator Rewards ([Metricool](https://metricool.com/tiktok-creator-next/)). [DATA]
9. **Put the key number on screen in the first 3 seconds.** TikTok's own ad data: over 63% of the highest-CTR videos highlight the key message in the first 3 s ([TikTok for Business](https://ads.tiktok.com/business/en-US/blog/9-creative-tips-to-drive-auction-ad-performance)). [OFFICIAL, ads data]
10. **Burn in captions and also use voice or sound.** 69% of US adults watch video with sound off in public, and 80% say captions make them more likely to finish a video ([Verizon Media/Publicis 2019, via Streaming Media](https://www.streamingmedia.com/Articles/News/Online-Video-News/80-of-Video-Caption-Users-Arent-Hearing-Impaired-Finds-Verizon-131860.aspx)). On TikTok, 88% of users say sound is essential ([ROI Revolution, summarising TikTok research](https://roirevolution.com/blog/july-2021-social-media-water-cooler/)). [DATA]
11. **Posting cadence.** Buffer's data points to about 3-5 posts a week on Instagram ([Buffer, 2M posts](https://buffer.com/resources/how-often-to-post-on-instagram/)) and 2-5+ a week on TikTok, with views per post still rising up to 11+ a week ([Buffer, 11.4M posts](https://buffer.com/resources/how-often-should-you-post-on-tiktok/)). YouTube's Shorts lead says posting more does not by itself expand reach, but lots of low-quality clips can hurt ([MediaPost](https://www.mediapost.com/publications/article/388588/)). [DATA/OFFICIAL]
12. **Finance has extra rules on top of platform rules.**
    - FTC: the disclosure must be in the video itself, and spoken if the endorsement is spoken ([Davis Wright Tremaine](https://www.dwt.com/insights/2023/07/ftc-advertising-endorsement-and-testimonial-guides)).
    - TikTok: no branded content for any financial product ([Savings.com.au](https://www.savings.com.au/savings-accounts/the-end-of-fintok-tiktok-bans-crypto-and-finance-related-branded-content)).
    - YouTube: bans "get rich quick" promises ([YouTube Help](https://support.google.com/youtube/answer/2801973)).
    - EU: ESMA says a "this is not investment advice" disclaimer does not protect you ([CONSOB/ESMA, Jan 12 2026](https://www.consob.it/web/consob-and-its-activities/w/press-release-of-12-january-2026-finfluencers-)).
    - UK: the FCA says unauthorised promotion of regulated products can be a criminal offence ([FCA FG24/1](https://fca.org.uk/publications/finalised-guidance/fg24-1-finalised-guidance-financial-promotions-social-media)).

    Envelope Math should stay on **math and education, not recommendations**. [OFFICIAL]

---

## 1. The shared model: test audience, then widening rings

| Platform | What the platform says | Source |
|---|---|---|
| TikTok | Ranking combines **user interactions** (likes, shares, follows, comments, watch completion), **video information** (captions, sounds, hashtags) and **device/account settings** (lowest weight). "Strong indicators of interest, such as whether a user finishes watching a longer video, receive greater weight." Follower count and past high-performing videos are **not direct factors**. | [TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/); [TechCrunch 2020](https://techcrunch.com/2020/06/18/tiktok-explains-how-the-recommendation-system-behind-its-for-you-feed-works) [OFFICIAL] |
| Instagram | Since Apr 30 2024 a post is shown first to "a small audience" that may be interested, whether or not they follow the creator. The top performers go to a slightly wider audience, then wider again. When identical content exists, only the original is recommended. | [TechCrunch](https://techcrunch.com/2024/04/30/instagram-is-updating-its-ranking-systems-to-surface-more-content-from-smaller-original-creators) [OFFICIAL] |
| YouTube Shorts | Shorts lead Todd Sherman: Shorts viewers swipe without knowing what comes next, unlike long-form where a click is a deliberate choice. That is why "Viewed vs. swiped away" is the key choice signal. The system "will go and effectively find a seed audience… depending on how that goes, it may get a lot more traffic or it may taper off." | [Search Engine Journal](https://www.searchenginejournal.com/youtube-explains-how-shorts-algorithm-works/494953/); [TechCrunch 2023](https://techcrunch.com/2023/08/25/youtube-demystifies-the-shorts-algorithm-views-and-answers-other-creator-questions/); [MediaPost](https://www.mediapost.com/publications/article/388588/) [OFFICIAL] |
| YouTube (general) | Creator Liaison Rene Ritchie: "the algorithm follows the audience, so please the audience." Check which videos grow your audience and make more like those. | [Tubefilter, Aug 2024](https://www.tubefilter.com/2024/08/26/rene-ritchie-shorts-creator-faqs/) [OFFICIAL] |

**Implication.** Every upload gets its own test, so each video has to stand on its own. The first ring of viewers is people interested in the topic, not your followers. That is why each video's topic needs to be clear early, through on-screen text, spoken keywords and the caption.

---

## 2. YouTube Shorts

### 2.1 How views are counted (changed twice)
- **Mar 31 2025:** a Shorts view counts when the Short **starts playing or replays**, with no minimum watch time. The older, stricter count was kept as **Engaged views** (Analytics > Advanced Mode). Earnings still use Engaged Shorts views and engaged watch hours ([Tubefilter](https://www.tubefilter.com/2025/03/26/youtube-shorts-views-counting-stats/); [Pixability](https://www.pixability.com/uncategorized/whats-changing-with-shorts-organic-views/); [Creator Essentials glossary](https://www.creatoressentials.com/glossary/shorts-engaged-views/)). Engaged views **exclude loops** ([Says.com](https://says.com/my/tech/youtube-shorts-new-metric)). [OFFICIAL via press]
- **Aug 24 2026:** "first-frame" counting extends to long-form, live and podcasts. Previously a long-form view took about 30 s. Billable ad views and engaged views stay separate, and **earnings are unaffected** ([Tubefilter](https://www.tubefilter.com/2026/08/18/youtubes-now-counting-public-views-from-the-first-frame-hoping-inflated-numbers-will-help-creators-negotiate-brand-deals/); [MediaNama](https://www.medianama.com/2026/08/223-youtube-counts-views-first-frame-monetisation/); [Inside YouTube](https://blog.youtube/inside-youtube/engaged-views-youtube-explained/)). Most analytics (CTR, AVD, retention) stay anchored on engaged views ([Inside YouTube](https://blog.youtube/inside-youtube/engaged-views-youtube-explained/)). [OFFICIAL]
- **What this means for us:** public view counts (ours and competitors') are now inflated reach numbers. Benchmark outliers on **engaged views, Stayed-to-watch % and AVD as % of length**.

### 2.2 The choice metric: Viewed vs. swiped away / "Stayed to watch"
- Shown in Analytics as "How many chose to view". YouTube's broader analytics glossary calls it "Stayed to watch" ([Creator Essentials](https://www.creatoressentials.com/glossary/viewed-vs-swiped-away/); [Shortimize](https://www.shortimize.com/blog/youtube-shorts-retention-rate)). [OFFICIAL via 3P]
- **Benchmarks are community consensus, not YouTube's.** Creators quote 70-80% "viewed" as healthy and over 40% swipe-away as a red flag. YouTube has **not** published an official benchmark, so compare against your own channel ([Subscribr](https://subscribr.ai/p/youtube-shorts-analytics-metrics-viral); [Bytecap](https://www.bytecap.io/research/youtube-shorts-retention-benchmarks)). [3P]

### 2.3 Length
- The maximum has been **3 minutes** for square or vertical uploads since **Oct 15 2024** ([Tubefilter](https://www.tubefilter.com/2024/10/03/youtube-shorts-three-minutes-max-length-redesign-trends-templates/); [Gigazine](https://gigazine.net/gsc_news/en/20241004-youtube-short-video-length-3-minutes)). [OFFICIAL]
- **Copyright trap:** a Short **over 1 minute with any active Content ID claim is blocked globally**. It cannot be played, recommended or monetized ([YouTube Help: three-minute Shorts](https://support.google.com/youtube/answer/15424877?hl=en); [Manage Shorts as a rights holder](https://support.google.com/youtube/answer/13053317)). Licensed music in a Short **reduces the creator's share** of the Shorts revenue pool ([vidIQ](https://vidiq.com/blog/post/youtube-shorts-monetization/)). Use original or royalty-free audio. [OFFICIAL]
- **Data:**
  - Adobe Express surveyed 507 Shorts creators (each with 1k+ subscribers). An average of 46% named **under 30 s** as best for views, shares, click-throughs and saves. For subscriber growth, 30-60 s tied with under 30 s at 34% each ([Adobe](https://www.adobe.com/express/learn/blog/youtube-shorts-length-study); [ContentGrip](https://www.contentgrip.com/youtube-shorts-length-study/)). [DATA, survey]
  - OpusClip's Apr 2026 report covers 2.88M clips made with its tool. 30-60 s was the most common length (40.1%). This measures **what people made, not what performed** ([OpusClip](https://opus.pro/blog/ideal-youtube-shorts-length-format-retention)). [DATA, descriptive]
- Sherman's guidance is to decide length by "how long it takes to tell your story" ([MediaPost](https://www.mediapost.com/publications/article/388588/)). [OFFICIAL]

### 2.4 Posting behaviour (from the Shorts lead)
- **Frequency:** "nothing in the algorithm" expands or reduces reach just because you post more, but lots of low-quality clips can hurt ([Social Media Today](https://www.socialmediatoday.com/news/youtube-shares-advice-for-shorts-creators-including-notes-on-hashtags-the/691835/)). [OFFICIAL]
- **Deleting and re-uploading** to "re-trigger" the algorithm: "I would not advise that… it gets seen as spam in our systems" ([Social Media Today](https://www.socialmediatoday.com/news/youtube-shares-advice-for-shorts-creators-including-notes-on-hashtags-the/691835/)). [OFFICIAL]
- **Hashtags** help tie a Short to topics and events but are not necessary ([same source](https://www.socialmediatoday.com/news/youtube-shares-advice-for-shorts-creators-including-notes-on-hashtags-the/691835/)). [OFFICIAL]
- **Time of day:** apart from breaking news, don't worry about when you post ([MediaPost](https://www.mediapost.com/publications/article/388588/)). [OFFICIAL]
- [UNVERIFIED] Several 2026 blogs claim a "30-60 minute priority test window" ([AIR Media-Tech](https://air.io/en/trending/youtube-algorithm-in-2026-month-by-month-changes-that-affect-your-views)). YouTube has not confirmed this, and Sherman describes seed audiences that "may taper off" or grow later.

### 2.5 Originality, reuse and AI on YouTube
- **Jul 15 2025, YPP "inauthentic content":** the "repetitious content" rule was renamed. It targets content that "follows a template with minimal variation, is easy to reproduce at scale," or is mass-produced ([Plagiarism Today](https://www.plagiarismtoday.com/2025/07/08/youtube-targets-inauthentic-content/); [Gulf News](https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660)). Under the reused-content rule, borrowed material must be "significantly altered". Adding music, changing speed or cropping is not enough ([Subsub](https://www.subsub.io/blog/youtube-inauthentic-content-policy-2025)). [OFFICIAL via press]
- **Oct 1 2026, Shorts recommendation update** (Rene Ritchie on Creator Insider):
  - Shorts recommendations will "further prioritize original content" and reduce reach for channels that mainly aggregate or re-upload.
  - "VO descriptions of what's happening on screen, minor technical edits, or template-based bulk changes" do **not** count as original. Commentary, analysis, storytelling and perspective do.
  - The change affects recommendations only. Monetization is still governed by the reused-content policy.
  - Reach is re-evaluated if a channel shifts to original content.
  - No start date or dashboard was given.

  Sources: [Relevant Audience](https://www.relevantaudience.com/youtube/youtube-shorts-original-content-reach-update/); [Android Headlines](https://www.androidheadlines.com/2026/10/youtube-cuts-reach-reuploaded-shorts-originality-push.html); [X summary noting Mario Joos's post at 86.3K views](https://x.com/AGTPinsights/status/2106005909436854421). [OFFICIAL via press, 6 days old at time of writing]
- **Jan 2026, Neal Mohan's annual letter:** "The rise of AI has raised concerns about low-quality content." YouTube is building on its spam and clickbait systems to reduce low-quality AI content. It is also launching AI tools, including Shorts made with a creator's own AI likeness ([eWeek](https://www.eweek.com/de/news/youtube-ai-slop-crackdown-creators/); [Media Copilot](https://mediacopilot.ai/youtube-ceo-mohan-ai-slop-creator-tools-2026/)). [OFFICIAL via press]
- **Scale of the problem:** Kapwing's "AI Slop Report" made a fresh YouTube account and found **104 of the first 500 Shorts (21%) were AI-generated** and 165 (33%) were "brainrot" ([The Decoder](https://the-decoder.com/one-in-five-youtube-shorts-shown-to-new-users-is-ai-generated-slop-study-finds/); [Kapwing](https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/)). [DATA, single-account audit]
- **AI disclosure, in force since Mar 2024:** creators must disclose **realistic** altered or synthetic content in three cases: making a real person appear to say or do something they didn't; altering footage of real events or places; or generating realistic scenes that didn't happen. **No label is needed for productivity uses** such as scripts, ideas or auto-captions. Failing to disclose can lead to removal or YPP suspension ([9to5Google](https://9to5google.com/2024/03/18/youtube-altered-content-disclosure/); [NBC News](https://www.nbcnews.com/tech/tech-news/youtube-says-will-require-creators-label-ai-content-rcna143937)). [OFFICIAL via press] **For us:** animated charts, envelopes and number reveals are clearly not "realistic scenes", so no label is needed. Any AI voice cloned from a real person, or any photoreal AI B-roll of real places or events, would need the label.
- **Faceless and AI-voice channels:** YouTube staff say AI use is not disqualifying in itself and that the algorithm doesn't consider monetization status. Faceless channels with their own script, narration and research are monetized like any other ([OutlierKit](https://outlierkit.com/resources/faceless-youtube-channel-demonetized/); [Subscribr](https://subscribr.ai/p/mistakes-new-faceless-ai-channels)). [3P paraphrase of Ritchie. Verify on Creator Insider before relying on it.]

### 2.6 Monetization thresholds (affects strategy)
- **Today, through Jan 31 2027:**
  - Ad revenue tier: 1,000 subscribers plus **10M valid public Shorts views in 90 days**, or 4,000 watch hours in 12 months.
  - Fan-funding tier: 500 subscribers plus 3M Shorts views in 90 days, or 3,000 watch hours ([vidIQ](https://vidiq.com/blog/post/monetize-youtube-guide/); [AIR](https://air.io/en/monetization/youtube-partner-program-requirements-2026-the-complete-guide)). [OFFICIAL via 3P]
- **Announced Aug 10 2026, effective Feb 1 2027:**
  - **New** applicants need 1,000 subscribers plus **8,000 watch hours in 365 days or 20M qualified Shorts views in 90 days**.
  - **All** creators need a rolling **10M qualified Shorts views per 90 days** to keep earning from the Shorts pool. Channels below that keep long-form earnings, and Shorts revenue resumes when they cross 10M again.
  - Existing YPP members are exempt from the new entry bar.

  Sources: [YouTube Blog](https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/); [vidIQ](https://vidiq.com/blog/post/youtube-partner-program-changes-2027/); [Relevant Audience](https://www.relevantaudience.com/youtube/youtube-partner-program-thresholds-double-february-2027/); [TechTimes](https://www.techtimes.com/articles/323954/20260811/youtube-partner-program-doubles-entry-bar-adds-monthly-shorts-earnings-gate.htm). [OFFICIAL]
  **Implication:** a channel launching in Oct 2026 has about 4 months to qualify under today's 10M/90-day bar before it doubles. That argues for a high-cadence Shorts push now plus a long-form track, because 8,000 hours may be easier to reach than 20M Shorts views.
- **Shorts RPM is small.** Typical reported Shorts RPM is about **$0.03-$0.10 per 1,000 views**, and creators keep **45%** of their allocated pool share ([vidIQ](https://vidiq.com/blog/post/youtube-shorts-monetization/)). The $10-$25 "finance RPM" figures quoted online are **long-form** numbers ([OutlierKit](https://outlierkit.com/blog/youtube-rpm-finance-niche)). [3P] Shorts are a discovery engine. Real revenue comes from long-form, products or sponsors.
- **Shorts to long-form:** the "Related video" link is reported to convert under 1% in creator anecdotes. That is still about 3,000+ clicks from a 10M-view Short ([Subscribr](https://subscribr.ai/p/convert-shorts-viewers-to-subscribers)). [3P anecdote]

---

## 3. Instagram Reels

### 3.1 Ranking signals (from Mosseri)
- **Jan 2025:** the three most important signals are **watch time, likes per reach and sends per reach**. Likes matter slightly more for followers (connected reach). **Sends matter more for non-followers** (unconnected reach) ([Social Media Today](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/); [Social Samosa](https://www.socialsamosa.com/news-2/instagram-reveals-key-factors-for-boosting-reach-8646916)). [OFFICIAL]
- Mosseri quote: "More important than watch time or like and comment counts is send rates, [and] generally, I think the rate is more important than the count" ([House of Marketers](https://houseofmarketers.com/instagram-chief-profile-growth-tips-2025/); [Dataslayer](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers)). [OFFICIAL via 3P]
- **Views became the primary metric** across Instagram content types on **Apr 21 2025**, replacing plays and impressions. **Repeat views by the same person count** ([SocialPilot](https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes); [Social Samosa](https://socialsamosa.com/news-2/instagram-updates-metrics-creators-prioritise-reach-6807009)). [OFFICIAL via press]
- **Skip rate**, added Aug 2025, is the share of views that skipped within the first 3 seconds. It replaced "view rate" in Reels insights ([Metricool](https://metricool.com/instagram-reel-analytics/); [Marketing4eCommerce](https://marketing4ecommerce.net/en/retention-and-skip-rate-reels/)). Industry trackers call under ~30-40% healthy and over 50% a sign of a broken hook ([Metricool](https://metricool.com/instagram-reel-analytics/)). The thresholds are [3P].
- [UNVERIFIED] Several 2026 blogs say Mosseri claimed sends are worth "3-5x likes", that originals get "40-60% more distribution", or that "10+ reposts in 30 days" removes an account ([Dataslayer](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers); [Vaizle](https://insights.vaizle.com/new-instagram-algorithm/)). I found no primary source for these numbers. Do not cite them.

### 3.2 Originality and aggregators
- **Apr 30 2024:** ranking changes gave smaller creators more distribution. Original content replaces reposts in recommendations, reposts get labels linking to the original, and aggregators are removed from recommendations ([TechCrunch](https://techcrunch.com/2024/04/30/instagram-is-updating-its-ranking-systems-to-surface-more-content-from-smaller-original-creators); [Gigazine](https://www.gigazine.net/gsc_news/en/20240502-instagram-updated-algorithm-prioritizes-original-content)). [OFFICIAL]
- **Apr 30 2026:**
  - The rule now covers photos and carousels as well as Reels. "Accounts that primarily post unoriginal content… will no longer be shown in places where we recommend content."
  - **75% of US recommendations now come from original posts.**
  - Eligibility returns when most posts in a **rolling 30-day window** are original.
  - Allowed: your own commentary, analysis, context or original graphics. Not allowed: cropping, resizing, adding a border, watermarking or caption credit alone.

  Sources: [TechCrunch](https://techcrunch.com/2026/04/30/instagram-restricts-reach-of-content-aggregators-in-new-crackdown/); [Tubefilter](https://tubefilter.com/2026/04/30/instagram-removes-algorithm-recommendations-repost-content-aggregator); [PetaPixel](https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/); [Instagram Creators blog](https://creators.instagram.com/blog/rewarding-original-creators-on-instagram). [OFFICIAL]
- **Other-app watermarks:** Reels showing a TikTok or other-app logo are made "less discoverable". **Your own logo is fine.** Instagram also advised against borders and Reels "predominantly covered by text" ([Tubefilter 2021](https://tubefilter.com/2021/02/10/instagram-reels-with-tiktok-watermark-less-discoverable/); [Social Media Today on own-logo clarification](https://www.socialmediatoday.com/news/instagram-clarifies-including-your-own-logo-on-a-reel-is-ok/730852/)). [OFFICIAL] **For us:** export clean masters for each platform. A small "Envelope Math" bug is fine, but never cross-post a file with a TikTok watermark. Keep text overlays big but not wall-to-wall.
- **AI and authenticity:** in a Dec 31 2025 year-end post, Mosseri wrote that "authenticity is becoming infinitely reproducible." He conceded that AI labelling will struggle and suggested signing media at capture ([afaqs](https://www.afaqs.com/news/mktg/instagram-ceo-warns-the-ai-content-boom-is-eroding-authenticity-10971125); [Implicator](https://www.implicator.ai/instagrams-head-just-admitted-defeat-on-ai-slop-and-wants-camera-makers-to-fix-it/)). [OFFICIAL via press] **For us:** a recognisable, consistent human point of view (a voice, a signature envelope sketch, a "check my math" persona) becomes more valuable as AI content floods the feed.

### 3.3 Trial Reels
- Launched **Dec 10 2024**. A Trial Reel is shown **only to non-followers**. Followers don't see it on the profile or in their feed. Creators review its performance and then share it to followers or not. Mosseri said the goal is to "depressurize the experience of sharing reels" ([RouteNote](https://routenote.com/blog/how-to-test-reels-with-non-followers-on-instagram/); [NetInfluencer](https://www.netinfluencer.com/instagram-new-trial-reels/)). [OFFICIAL]
- **Eligibility is reported inconsistently.** Sources variously cite a public professional account, 1,000 followers, or 200 followers for professional accounts ([Social Samosa](https://www.socialsamosa.com/news-2/instagram-introduces-wider-access-trial-reels-9493132); [Storrito](https://storrito.com/resources/how-instagram-trial-reels-work-72-hours/)). [3P, check in-app]
- An **auto-share** option shares a Trial Reel with followers if it clears a performance threshold. One source puts the evaluation at about 72 h ([Storrito](https://storrito.com/resources/how-instagram-trial-reels-work-72-hours/); [Publer](https://publer.com/blog/en/instagram-trial-reels-guide/)). [3P] [UNVERIFIED] "Trial Reels schedulable since Feb 2026" ([CreatorFlow](https://creatorflow.so/blog/instagram-algorithm-2026/)).
- **For us:** once eligible, use Trial Reels to A/B test hooks (same math, different first 3 s) on cold audiences.

### 3.4 Length, hashtags and search
- **Length:** Reels can be up to **3 minutes**, and since Jan 2025 Instagram says it recommends Reels up to 3 min the same as shorter ones. Longer uploads are possible but not favoured in recommendations ([Lindsey Gamble](https://lindseygamble.com/blog/instagram-three-minute-reels); [NetInfluencer](https://www.netinfluencer.com/instagram-give-equal-recommendation-to-reels-3-minutes-in-length/)). [OFFICIAL]
- **Socialinsider, about 140k business Reels (2026):** **45-60 s** had the highest median views (10,374) and engagement rate (0.35%). Engagement is flat from 30 s to 3 min and falls to 0.15% beyond 3 min ([Socialinsider](https://socialinsider.io/blog/instagram-reels-length/)). [DATA]
- **Buffer:** Reels reach about 6.1x more accounts than photo or carousel posts, with a median of 182 views vs. 30 ([via Buffer coverage](https://buffer.com/resources/instagram-reels-length)). [DATA]
- **Hashtags are capped at 5 per post or Reel**, rolled out Dec 2025. Mosseri says a few specific tags beat long generic lists ([Blog du Modérateur](https://www.blogdumoderateur.com/instagram-limite-hashtags-5-par-publication/); [OnlineMarketing.de](https://onlinemarketing.de/social-media-marketing/hashtag-limit-instagram)). [OFFICIAL via press]
- **Google indexing:** since **Jul 10 2025**, public posts from professional accounts (18+) can appear in Google and Bing search. This is on by default ([Metricool](https://metricool.com/instagram-indexing-on-google/); [Search Engine World](https://www.searchengineworld.com/its-live-instagram-posts-are-ranking-and-showing-in-google-and-bing-seo-meets-social)). [OFFICIAL via press] **For us:** write captions that answer a searchable question, such as "how much is $1 a day for 40 years".

### 3.5 Posting frequency
- **Buffer, 2M+ posts from 100k+ accounts:** **3-5 posts a week** is the sweet spot. More posting brings more reach, with diminishing returns ([Buffer](https://buffer.com/resources/how-often-to-post-on-instagram/)). [DATA]

---

## 4. TikTok

### 4.1 Official recommendation factors
- See section 1. TikTok's official explainer lists user interactions, video information and device/account settings, with finishing a longer video as a strong signal. Follower count and past hits are not direct factors ([TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/); [TechCrunch](https://techcrunch.com/2020/06/18/tiktok-explains-how-the-recommendation-system-behind-its-for-you-feed-works)). [OFFICIAL]
- **For You eligibility:** content that is unoriginal, low-quality or carries another platform's watermark is "FYF ineligible" ([Online Optimism](https://onlineoptimism.com/blog/updates-tiktoks-community-guidelines)). The Community Guidelines were last updated **Sep 13 2025** ([ConductAtlas diff record](https://conductatlas.com/platform/tiktok/tiktok-community-guidelines/for-you-feed-eligibility-exclusion/)). [OFFICIAL via 3P]

### 4.2 Length and Creator Rewards
- **Buffer, 1.1M TikToks:** 86% of TikToks are under 1 minute, yet videos **over 60 s** got **43.2% more reach and 63.8% more watch time**. They got 70.3% more reach than 10-30 s clips ([Buffer](https://buffer.com/resources/longer-tiktoks-get-more-views-data/); [NetInfluencer](https://www.netinfluencer.com/tiktok-longer-videos-outperform-short-form-content-study-reveals/)). [DATA]
- **Socialinsider 2026:** videos of about 30 s had the highest engagement rate, and 2-3 min videos had the most views ([Socialinsider](https://www.socialinsider.io/blog/how-long-are-tiktok-videos/)). [DATA]
- **Creator Rewards Program:** only videos **over 1 minute** earn.
  - A "qualified view" is at least 5 s and not marked "not interested". At least 1,000 qualified views are needed.
  - The account needs 18+, 10k followers and 100k views in 30 days.
  - Original content only.

  Sources: [Metricool](https://metricool.com/tiktok-creator-next/); [MegaDigital](https://megadigital.ai/en/blog/tiktok-creator-rewards-program/). [OFFICIAL via 3P] **For us:** on TikTok, use a 61-75 s "extended cut" of the strongest concepts. The 20-35 s cut stays as the YouTube Shorts master.

### 4.3 Hooks, sound and search
- **Hooks:** TikTok's ads team found that over 63% of the highest-CTR videos highlight the key message or product in the first 3 s. They also found fast tracks over 120 BPM tend to drive higher view-through ([TikTok for Business](https://ads.tiktok.com/business/en-US/blog/9-creative-tips-to-drive-auction-ad-performance)). [OFFICIAL, ads data]
- [3P] OpusClip's analysis of 34,635 TikToks says about 90% of underperformers fail in the first 3 s, and "outcome-first" hooks (showing the result in frame 1) performed best ([OpusClip](https://www.opus.pro/blog/tiktok-hook-formulas); [tlinky](https://tlinky.com/3-second-hook/)).
- **Sound:** 88% of TikTok users say sound is essential to the experience (TikTok-commissioned research) ([ROI Revolution](https://roirevolution.com/blog/july-2021-social-media-water-cooler/)). [DATA, platform-commissioned]
- **Search:** third-party SEO guides say TikTok search indexes spoken words (speech recognition), on-screen text (OCR), captions and hashtags ([BlitzCut](https://blitzcutai.com/blog/tiktok-seo-guide-2026); [Virlo](https://virlo.ai/blog/tiktok-seo-how-do-i-rank-videos-in-tiktok-search-2026)). TikTok's official explainer confirms that captions, sounds and hashtags are ranking inputs ([TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/)). The OCR/ASR detail is [3P]. **For us:** say the key phrase out loud and show it on screen, e.g. "Is a $5 coffee really $1 million?"

### 4.4 Posting frequency
- **Buffer, 11.4M posts from 150k+ accounts:** compared with posting once a week, **2-5 posts a week** gave +17% views per post, **6-10** gave +29%, and **11+** gave +34% ([Buffer](https://buffer.com/resources/how-often-should-you-post-on-tiktok/); [NetInfluencer](https://www.netinfluencer.com/tiktok-sweet-spot-new-study-shows-2-5-weekly-posts-maximize-viewing-efficiency/)). [DATA]

### 4.5 AI content
- TikTok requires labels on realistic AI-generated content, auto-labels content carrying C2PA Content Credentials, and is part of the Content Authenticity Initiative ([NBC New York](https://www.nbcnewyork.com/news/national-international/tiktok-to-start-labeling-ai-generated-content-as-technology-becomes-more-universal/5399109)). [OFFICIAL via press]
- **Nov 19 2025:** an "AI" slider in **Manage Topics** lets users dial AI-generated content up or down, backed by invisible watermarking ([TechRepublic](https://www.techrepublic.com/article/news-tiktok-ai-content/); [eWeek](https://www.eweek.com/news/tiktok-ai-transparency/)). [OFFICIAL via press] **For us:** if our videos read as AI-generated, some viewers may have opted out of seeing them. A clearly human voice and hand-drawn style help.

### 4.6 US ownership change (2026)
- **Jan 22 2026:** the TikTok USDS Joint Venture closed. Oracle, Silver Lake and MGX hold 15% each, and ByteDance holds under 20%. The US algorithm is a licensed copy being **"retrained" on US user data**, a process reported to run from Q1 to about mid-2026. TikTok says US creators remain globally discoverable ([Al Jazeera](https://www.aljazeera.com/news/2026/1/23/who-controls-tiktoks-us-platform-under-new-deal); [Search Engine Land](https://searchengineland.com/tiktok-launches-u-s-controlled-joint-venture-467875)). [OFFICIAL via press] **For us:** expect US For You behaviour to drift during 2026. Treat older "TikTok algorithm" folklore with extra scepticism and test for yourself.

---

## 5. Cross-platform craft rules (synthesis with evidence)

| Lever | Evidence | Envelope Math rule |
|---|---|---|
| **Hook in 0-3 s** | YouTube's stay/swipe choice metric ([SEJ](https://www.searchenginejournal.com/youtube-explains-how-shorts-algorithm-works/494953/)); Instagram's 3-s Skip rate ([Metricool](https://metricool.com/instagram-reel-analytics/)); TikTok's 63% stat ([TikTok for Business](https://ads.tiktok.com/business/en-US/blog/9-creative-tips-to-drive-auction-ad-performance)) | Frame 1 shows **the surprising number or the question**, e.g. "$4.75 → $1,000,000?". Say it aloud in the first 1.5 s. No logo intro. |
| **Completion and loops** | TikTok weights finishing a video ([Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/)); YouTube counts each replay as a view ([Pixability](https://www.pixability.com/uncategorized/whats-changing-with-shorts-organic-views/)); Instagram views include repeats ([SocialPilot](https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes)) | End on the answer frame so it flows back into the opening question (a seamless loop). Keep YouTube cuts at 20-35 s. Remember that **engaged views exclude loops** ([Says](https://says.com/my/tech/youtube-shorts-new-metric)), so loops lift reach, not earnings. |
| **Shareability (sends)** | Sends per reach is the top Instagram signal for non-followers ([SMT](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/)); TikTok counts shares as user interactions ([Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/)) | Every video needs a "tag-able" person: "the friend who buys a $7 latte daily" or "your dad who says 'back in my day'". |
| **Comments without bait** | Meta demotes engagement bait such as "comment YES", "tag a friend" and vote-baiting ([TechCrunch 2017](https://techcrunch.com/?p=1579223); [SEJ](https://www.searchenginejournal.com/facebook-demoting-engagement-bait/228071)) | Ask genuine questions ("What did I get wrong in step 2?") or leave a deliberate open estimate ("I rounded US households to 130M. Fair?"). Avoid "comment 1 if…". |
| **Captions and on-screen text** | 69% watch sound-off in public, and 80% are more likely to finish with captions ([Verizon/Publicis](https://www.streamingmedia.com/Articles/News/Online-Video-News/80-of-Video-Caption-Users-Arent-Hearing-Impaired-Finds-Verizon-131860.aspx)); TikTok users are sound-on ([ROI Revolution](https://roirevolution.com/blog/july-2021-social-media-water-cooler/)); Instagram warns against Reels "predominantly covered by text" ([Tubefilter](https://tubefilter.com/2021/02/10/instagram-reels-with-tiktok-watermark-less-discoverable/)) | Burn in captions (large, centred, outside the UI safe zones). Put the running total in a fixed "envelope" corner. Use voice plus a light, original beat. |
| **Length** | YouTube: under 30 s favoured ([Adobe](https://www.adobe.com/express/learn/blog/youtube-shorts-length-study)). Instagram: 45-60 s ([Socialinsider](https://socialinsider.io/blog/instagram-reels-length/)). TikTok: over 60 s ([Buffer](https://buffer.com/resources/longer-tiktoks-get-more-views-data/)) | Produce one master in three cuts: about 25 s (YouTube), about 45 s (Instagram) and about 65 s (TikTok, with a "show your work" extension). |
| **Originality** | YouTube Jul 2025 and Oct 2026; Instagram Apr 2024 and Apr 2026; TikTok FYF eligibility (all above) | Our own math, our own animation and our own voice. Never re-cut other creators' clips. If we reference a TV or news moment, recreate it as a quote card with commentary and keep it under 1 minute (Content ID rule). |
| **Avoid templated mass production** | YPP "inauthentic content" covers templates with minimal variation ([Plagiarism Today](https://www.plagiarismtoday.com/2025/07/08/youtube-targets-inauthentic-content/)) | Rotate several distinct formats. Vary structure, voice delivery and visuals. Every video carries a unique calculation and a point of view. |
| **Cadence** | Instagram 3-5/week, TikTok 2-11+/week ([Buffer](https://buffer.com/resources/how-often-should-you-post-on-tiktok/)); YouTube: quality over volume ([SMT](https://www.socialmediatoday.com/news/youtube-shares-advice-for-shorts-creators-including-notes-on-hashtags-the/691835/)) | 5-7 posts a week cross-posted from clean masters. Never delete and re-upload a flop. Iterate on a new video instead. |
| **Hashtags and metadata** | Instagram capped at 5 ([Blog du Modérateur](https://www.blogdumoderateur.com/instagram-limite-hashtags-5-par-publication/)); YouTube hashtags optional ([SMT](https://www.socialmediatoday.com/news/youtube-shares-advice-for-shorts-creators-including-notes-on-hashtags-the/691835/)) | 2-4 specific tags (#moneymath, #compoundinterest, #budgeting, #envelopemath). Put the searchable question in the title or caption. |

---

## 6. How a zero-subscriber channel breaks out (evidence-based)

1. **The system does not wait for followers.** TikTok says follower count isn't a direct factor ([TechCrunch](https://techcrunch.com/2020/06/18/tiktok-explains-how-the-recommendation-system-behind-its-for-you-feed-works)). Instagram's Apr 2024 change was explicitly about giving **smaller creators** more distribution ([TechCrunch](https://techcrunch.com/2024/04/30/instagram-is-updating-its-ranking-systems-to-surface-more-content-from-smaller-original-creators)). YouTube Shorts finds a seed audience for each Short ([MediaPost](https://www.mediapost.com/publications/article/388588/)). [OFFICIAL]
2. **Originality is now the entry ticket.** New faceless channels are in the group most at risk of being read as aggregators or "slop", given the 2025-2026 updates above. An identifiable original format protects reach.
3. **A clear niche builds the audience model.** "The algorithm follows the audience": look at which videos grew your audience and make the next one those viewers would want ([Tubefilter](https://www.tubefilter.com/2024/08/26/rene-ritchie-shorts-creator-faqs/)). Stick to one recognisable promise (rough-but-right money math) so the seed audiences converge.
4. **Volume plus iteration, not delete-and-repost.** Buffer's data shows views per post keep rising with cadence on TikTok ([Buffer](https://buffer.com/resources/how-often-should-you-post-on-tiktok/)). Re-uploading the same file looks like spam on YouTube ([SMT](https://www.socialmediatoday.com/news/youtube-shares-advice-for-shorts-creators-including-notes-on-hashtags-the/691835/)). Re-make the concept with a new hook instead.
5. **Test hooks on cold audiences.** Use Instagram Trial Reels once eligible ([RouteNote](https://routenote.com/blog/how-to-test-reels-with-non-followers-on-instagram/)). Judge each video by YouTube Stayed-to-watch and Instagram Skip rate.
6. **Shorts can take off late.** Seed-audience testing can keep running after the first day ([MediaPost](https://www.mediapost.com/publications/article/388588/)), so don't judge a Short in its first hour.
7. [3P] Faceless-channel growth guides describe 3-6 months of consistent daily posting before Shorts regularly reach 50k-500k views ([OutlierKit](https://outlierkit.com/resources/faceless-youtube-channels/)). These are anecdotal timelines, not data.

---

## 7. Finance-specific rules and risks

### 7.1 Disclosure (sponsorships and affiliate links)
- **FTC Endorsement Guides, updated Jun 29 2023:**
  - In video, the disclosure must be **in the video itself**, not only in the description.
  - It must be "unavoidable" and in the same format as the endorsement, so a spoken endorsement needs a spoken disclosure.
  - Free products count as material connections.

  Sources: [Davis Wright Tremaine](https://www.dwt.com/insights/2023/07/ftc-advertising-endorsement-and-testimonial-guides); [Kelley Drye](https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/how-the-ftcs-revised-endorsement-guides-will-affect-influencer-campaigns). [OFFICIAL via law firms]
- **YouTube:** tick "includes paid promotion" for any paid placement, sponsorship or endorsement, including in Shorts. YouTube then shows a disclosure for 10 s ([YouTube Help](https://support.google.com/youtube/answer/154235)). [OFFICIAL]
- **TikTok:** branded content for **all financial services and products** is prohibited. That includes crypto, loans, credit cards, BNPL, trading platforms, forex, investment services, debt help and "get rich quick". Organic education is not banned ([Savings.com.au](https://www.savings.com.au/savings-accounts/the-end-of-fintok-tiktok-bans-crypto-and-finance-related-branded-content); [Decrypt](https://decrypt.co/75661/tiktok-bans-paid-crypto-promotions-but-financial-analysis-unaffected?amp=1)). [OFFICIAL via press] **For us:** do not plan fintech or broker sponsorships on TikTok. Use YouTube or Instagram with full disclosure, or sponsors outside finance (spreadsheets, notebooks, calculators, budgeting apps; check whether these count as "financial services").

### 7.2 Platform content rules that hit finance
- **YouTube spam, deceptive practices and scams policy:** prohibits "get rich quick" schemes, pyramid schemes, cash-gift scams, exaggerated promises of fast money, and misleading titles or thumbnails ([YouTube Help](https://support.google.com/youtube/answer/2801973)). [OFFICIAL] **For us:** never title a video "turn $100 into $1M fast". Frame it as math, e.g. "what $100/month becomes at 7% over 40 years (not a promise)".
- **Meta recommendation guidelines:** content allowed on Facebook and Instagram but **not recommended** includes "sensitive or low-quality content about health or finance" and "misleading business models" ([Social Samosa on Facebook's Recommendation Guidelines](https://www.socialsamosa.com/2020/09/facebook-highlights-recommendation-guidelines)). [OFFICIAL via press] Accurate, sourced math is what keeps finance content recommendable.
- **Accuracy is a differentiator.** DayTrading.com graded 10 high-view finance TikToks (Sep 2025): **70% failed to reach a B**, 30% got an F on risk disclosure, and 60% got a D or F on oversimplification ([DayTrading.com](https://www.daytrading.com/tiktok/report-card); [The Daily Upside](https://www.thedailyupside.com/advisor/financial-planning/most-finfluential-tiktok-posts-were-already-misleading-now-the-trend-is-worsening/)). The sample is small, so treat it as directional.

### 7.3 Finfluencer regulation (if the audience is global)
- **US (FINRA/SEC):** both regulators focus on firms that use influencers. Examples include **M1 Finance, fined $850k (2024)**, and **Open to the Public Investing, fined $350k (May 2025)**, for influencer-program supervision failures ([Carlton Fields](https://www.carltonfields.com/insights/expect-focus/2024/finra-and-sec-float-concerns-over-social-media-finfluencers); [InnReg](https://www.innreg.com/resources/regulatory-updates/finra-and-sec-increase-focus-on-social-media-finfluencers)). Influencer content tied to a broker must be "fair, balanced and not misleading". Individual US creators doing general education are not directly regulated, but **personalised securities recommendations made for compensation can bring investment-adviser rules into play.** [OFFICIAL via law firms]
- **UK (FCA FG24/1, Mar 26 2024):** promotions must be fair, clear and not misleading. An **unauthorised influencer who promotes a regulated financial product without approval may commit a criminal offence** ([FCA](https://fca.org.uk/publications/finalised-guidance/fg24-1-finalised-guidance-financial-promotions-social-media); [Hogan Lovells](https://www.hoganlovells.com/en/publications/uk-fca-finalises-social-media-financial-promotions-guidance)). Avoid urgency language like "get rich fast" ([Investment Executive on FCA meme warning](https://www.investmentexecutive.com/news/fca-warns-firms-finfluencers-about-misleading-memes/)). [OFFICIAL]
- **EU (ESMA factsheet, Jan 12 2026):**
  - Telling people what to invest in, or what to avoid, can count as regulated investment advice.
  - **A "this is not investment advice" disclaimer does not protect you.**
  - Label paid content "advertisement", "sponsored" or "paid collaboration", and separate facts from opinions.
  - For high-risk products, flag that up to 100% of the capital can be lost.

  Sources: [CONSOB](https://www.consob.it/web/consob-and-its-activities/w/press-release-of-12-january-2026-finfluencers-); [ESMA Ireland factsheet PDF](https://www.esma.europa.eu/sites/default/files/2026-01/IE_Ireland_en_-_Finfluencers_factsheet.pdf). [OFFICIAL]
- **India (SEBI, Aug 29 2024):** SEBI-regulated entities may not associate with unregistered finfluencers who give advice or performance claims. There is an exemption for pure education, but educators must not use market price data from the **preceding 3 months** to name securities or imply future prices ([Taxmann](https://taxmann.com/post/blog/analysis-sebis-new-regulations-on-finfluencers-protecting-investors-from-unregistered-advisors); [MediaNama](https://www.medianama.com/2024/09/223-sebi-regulated-firms-barred-from-collaborating-with-unregistered-finfluencers/)). [OFFICIAL via press]

### 7.4 Compliance rules of thumb for Envelope Math (my synthesis, not legal advice)
1. Teach **math, not picks.** No "buy X", no price targets, no named-ticker calls. Use index-style "7% average" assumptions and say they are assumptions.
2. Show the formula and the assumptions on screen ("7%/yr, nominal, before fees and taxes"). This also feeds the "check my math" comment loop.
3. Treat any "not financial advice" line as courtesy, not protection (ESMA). The real protection is not giving personalised advice.
4. Disclose any paid relationship in the video, spoken and on screen (FTC). No financial-product sponsorships on TikTok.
5. No "get rich quick" framing in titles or thumbnails (YouTube scams policy; FCA urgency warning).
6. Cite sources in the caption for any real-world number (prices, debt, salaries). It lowers the misinformation risk and invites saves.

---

## 8. Concrete viral example found in this pass

This memo is about mechanics. Video-level outliers come from the vidIQ passes in the sibling files (`yt-big-number-math.md`, `yt-personal-money-math.md`, `ig-tiktok-outliers.md`). The one finance-math example that came up here with press-documented numbers:

- **Humphrey Yang, "Jeff Bezos's net worth in rice" (TikTok, Feb-Mar 2020).** One grain stood for $100,000, so 10,000 grains made $1B, and Bezos's roughly $122B came to about 58 lb of rice. Two 60-second videos drew **about 2.2M combined views** according to press at the time. The videos spread through shares and replays and were reposted into political debates ([Business Today](https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html); [Distractify](https://www.distractify.com/p/tiktok-bezos-grains-of-race); [Fortune](https://fortune.com/2020/03/21/tik-tok-influencers-personal-finance-advice)). I could not verify the original TikTok URL or current view count because fetching was blocked. **Why it matters for us:** it is the archetype of a physical unit conversion (money into rice, weight and time) that makes an incomprehensible number tangible and shareable. That is exactly the "envelope" move.
- **Context:** #cashstuffing, the envelope-budgeting trend that shares our name, is reported at about **1.9B hashtag views** on TikTok, and some outlets cite 3B+ for cash-stuffing and envelope content combined ([Canstar](https://www.canstar.com.au/budgeting/tiktok-money-trends/); [AOL](https://www.aol.com/meet-tiktok-money-experts-popularized-200022325.html)). The figures vary by source and date.

---

## 9. Open questions and things to re-verify
- The exact eligibility for Instagram Trial Reels for a new professional account (200 vs. 1,000 followers). Check in-app.
- Whether YouTube's Oct 1 2026 Shorts originality update treats **AI voice-over on original animation** differently from "VO describing someone else's clip". The quoted language targets narration over **borrowed** footage. Our footage is original, but watch the Creator Insider video.
- How fast the retrained US TikTok algorithm (2026) changes For You behaviour for new accounts. No public data yet.
- The YPP Feb 1 2027 thresholds should be read on the [YouTube Blog post](https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/) before the launch plan relies on them.

---

## Sources

**Official, or official via press**
- TikTok Newsroom, How TikTok recommends videos #ForYou: https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/
- TechCrunch, TikTok explains its For You system (2020): https://techcrunch.com/2020/06/18/tiktok-explains-how-the-recommendation-system-behind-its-for-you-feed-works
- TikTok for Business, 9 creative tips: https://ads.tiktok.com/business/en-US/blog/9-creative-tips-to-drive-auction-ad-performance
- TechCrunch, Instagram ranking update for smaller, original creators (Apr 30 2024): https://techcrunch.com/2024/04/30/instagram-is-updating-its-ranking-systems-to-surface-more-content-from-smaller-original-creators
- TechCrunch, Instagram restricts aggregators (Apr 30 2026): https://techcrunch.com/2026/04/30/instagram-restricts-reach-of-content-aggregators-in-new-crackdown/
- Tubefilter, Instagram aggregator penalty (Apr 30 2026): https://tubefilter.com/2026/04/30/instagram-removes-algorithm-recommendations-repost-content-aggregator
- PetaPixel, Instagram reposted-content policy: https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/
- Instagram Creators blog, Rewarding original creators: https://creators.instagram.com/blog/rewarding-original-creators-on-instagram
- Social Media Today, Instagram algorithm insights 2025 (Mosseri): https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/
- Social Samosa, Instagram key factors for reach: https://www.socialsamosa.com/news-2/instagram-reveals-key-factors-for-boosting-reach-8646916
- Tubefilter, Instagram TikTok-watermark Reels less discoverable (2021): https://tubefilter.com/2021/02/10/instagram-reels-with-tiktok-watermark-less-discoverable/
- Social Media Today, own logo on a Reel is OK: https://www.socialmediatoday.com/news/instagram-clarifies-including-your-own-logo-on-a-reel-is-ok/730852/
- RouteNote, Trial Reels: https://routenote.com/blog/how-to-test-reels-with-non-followers-on-instagram/
- NetInfluencer, Trial Reels: https://www.netinfluencer.com/instagram-new-trial-reels/
- Lindsey Gamble, 3-minute Reels: https://lindseygamble.com/blog/instagram-three-minute-reels
- NetInfluencer, equal recommendation for 3-min Reels: https://www.netinfluencer.com/instagram-give-equal-recommendation-to-reels-3-minutes-in-length/
- Blog du Modérateur, Instagram 5-hashtag cap: https://www.blogdumoderateur.com/instagram-limite-hashtags-5-par-publication/
- Metricool, Instagram indexing on Google: https://metricool.com/instagram-indexing-on-google/
- SocialPilot, Instagram Views metric change: https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes
- afaqs, Mosseri on AI and authenticity: https://www.afaqs.com/news/mktg/instagram-ceo-warns-the-ai-content-boom-is-eroding-authenticity-10971125
- Implicator, Mosseri year-end post: https://www.implicator.ai/instagrams-head-just-admitted-defeat-on-ai-slop-and-wants-camera-makers-to-fix-it/
- Search Engine Journal, YouTube explains the Shorts algorithm: https://www.searchenginejournal.com/youtube-explains-how-shorts-algorithm-works/494953/
- TechCrunch, YouTube demystifies the Shorts algorithm (2023): https://techcrunch.com/2023/08/25/youtube-demystifies-the-shorts-algorithm-views-and-answers-other-creator-questions/
- MediaPost, YouTube Shorts product lead insights: https://www.mediapost.com/publications/article/388588/
- Social Media Today, YouTube Shorts advice (hashtags, reposting): https://www.socialmediatoday.com/news/youtube-shares-advice-for-shorts-creators-including-notes-on-hashtags-the/691835/
- Tubefilter, Rene Ritchie Shorts FAQs: https://www.tubefilter.com/2024/08/26/rene-ritchie-shorts-creator-faqs/
- Tubefilter, Shorts views counting change (Mar 2025): https://www.tubefilter.com/2025/03/26/youtube-shorts-views-counting-stats/
- Pixability, Shorts organic views change: https://www.pixability.com/uncategorized/whats-changing-with-shorts-organic-views/
- Says.com, Shorts new metric: https://says.com/my/tech/youtube-shorts-new-metric
- Inside YouTube, engaged views explained: https://blog.youtube/inside-youtube/engaged-views-youtube-explained/
- Tubefilter, first-frame view counting (Aug 2026): https://www.tubefilter.com/2026/08/18/youtubes-now-counting-public-views-from-the-first-frame-hoping-inflated-numbers-will-help-creators-negotiate-brand-deals/
- MediaNama, first-frame counting: https://www.medianama.com/2026/08/223-youtube-counts-views-first-frame-monetisation/
- Tubefilter, 3-minute Shorts: https://www.tubefilter.com/2024/10/03/youtube-shorts-three-minutes-max-length-redesign-trends-templates/
- YouTube Help, three-minute Shorts and Content ID: https://support.google.com/youtube/answer/15424877?hl=en
- YouTube Help, Manage Shorts as a rights holder: https://support.google.com/youtube/answer/13053317
- Plagiarism Today, YouTube targets inauthentic content: https://www.plagiarismtoday.com/2025/07/08/youtube-targets-inauthentic-content/
- Gulf News, YPP inauthentic content: https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660
- Relevant Audience, Shorts originality update (Oct 2026): https://www.relevantaudience.com/youtube/youtube-shorts-original-content-reach-update/
- Android Headlines, Shorts re-upload reach cut: https://www.androidheadlines.com/2026/10/youtube-cuts-reach-reuploaded-shorts-originality-push.html
- eWeek, Mohan: cutting AI slop a 2026 priority: https://www.eweek.com/de/news/youtube-ai-slop-crackdown-creators/
- Media Copilot, Mohan 2026 letter: https://mediacopilot.ai/youtube-ceo-mohan-ai-slop-creator-tools-2026/
- 9to5Google, YouTube altered-content disclosure: https://9to5google.com/2024/03/18/youtube-altered-content-disclosure/
- NBC News, YouTube AI labels: https://www.nbcnews.com/tech/tech-news/youtube-says-will-require-creators-label-ai-content-rcna143937
- YouTube Blog, YPP 2027 updates: https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/
- Relevant Audience, YPP thresholds double Feb 2027: https://www.relevantaudience.com/youtube/youtube-partner-program-thresholds-double-february-2027/
- TechTimes, YPP doubles entry bar: https://www.techtimes.com/articles/323954/20260811/youtube-partner-program-doubles-entry-bar-adds-monthly-shorts-earnings-gate.htm
- YouTube Help, spam, deceptive practices and scams: https://support.google.com/youtube/answer/2801973
- YouTube Help, paid product placements: https://support.google.com/youtube/answer/154235
- NBC New York, TikTok AI labels: https://www.nbcnewyork.com/news/national-international/tiktok-to-start-labeling-ai-generated-content-as-technology-becomes-more-universal/5399109
- TechRepublic, TikTok AI content control: https://www.techrepublic.com/article/news-tiktok-ai-content/
- Online Optimism, TikTok Community Guidelines and FYF eligibility: https://onlineoptimism.com/blog/updates-tiktoks-community-guidelines
- ConductAtlas, TikTok FYF eligibility provision: https://conductatlas.com/platform/tiktok/tiktok-community-guidelines/for-you-feed-eligibility-exclusion/
- Al Jazeera, TikTok US joint venture: https://www.aljazeera.com/news/2026/1/23/who-controls-tiktoks-us-platform-under-new-deal
- Search Engine Land, TikTok US JV: https://searchengineland.com/tiktok-launches-u-s-controlled-joint-venture-467875
- Savings.com.au, TikTok bans finance branded content: https://www.savings.com.au/savings-accounts/the-end-of-fintok-tiktok-bans-crypto-and-finance-related-branded-content
- Decrypt, TikTok crypto promo ban: https://decrypt.co/75661/tiktok-bans-paid-crypto-promotions-but-financial-analysis-unaffected?amp=1
- Social Samosa, Facebook Recommendation Guidelines: https://www.socialsamosa.com/2020/09/facebook-highlights-recommendation-guidelines
- TechCrunch / SEJ, Meta engagement-bait demotion: https://techcrunch.com/?p=1579223 ; https://www.searchenginejournal.com/facebook-demoting-engagement-bait/228071
- TechCrunch, Meta unoriginal content crackdown (Jul 2025): https://techcrunch.com/2025/07/14/following-youtube-meta-announces-crackdown-on-unoriginal-facebook-content
- Davis Wright Tremaine, FTC Endorsement Guides 2023: https://www.dwt.com/insights/2023/07/ftc-advertising-endorsement-and-testimonial-guides
- Kelley Drye, FTC revised guides: https://www.kelleydrye.com/viewpoints/blogs/ad-law-access/how-the-ftcs-revised-endorsement-guides-will-affect-influencer-campaigns
- Carlton Fields, FINRA/SEC finfluencers: https://www.carltonfields.com/insights/expect-focus/2024/finra-and-sec-float-concerns-over-social-media-finfluencers
- InnReg, FINRA/SEC finfluencers: https://www.innreg.com/resources/regulatory-updates/finra-and-sec-increase-focus-on-social-media-finfluencers
- FCA FG24/1: https://fca.org.uk/publications/finalised-guidance/fg24-1-finalised-guidance-financial-promotions-social-media
- Hogan Lovells, FCA FG24/1: https://www.hoganlovells.com/en/publications/uk-fca-finalises-social-media-financial-promotions-guidance
- Investment Executive, FCA warns on memes: https://www.investmentexecutive.com/news/fca-warns-firms-finfluencers-about-misleading-memes/
- CONSOB, ESMA finfluencer tips (Jan 12 2026): https://www.consob.it/web/consob-and-its-activities/w/press-release-of-12-january-2026-finfluencers-
- ESMA factsheet (IE): https://www.esma.europa.eu/sites/default/files/2026-01/IE_Ireland_en_-_Finfluencers_factsheet.pdf
- Taxmann, SEBI finfluencer rules: https://taxmann.com/post/blog/analysis-sebis-new-regulations-on-finfluencers-protecting-investors-from-unregistered-advisors
- MediaNama, SEBI finfluencer rules: https://www.medianama.com/2024/09/223-sebi-regulated-firms-barred-from-collaborating-with-unregistered-finfluencers/

**Third-party data and studies**
- Buffer, longer TikToks get more views (1.1M videos): https://buffer.com/resources/longer-tiktoks-get-more-views-data/
- Buffer, TikTok posting frequency (11.4M posts): https://buffer.com/resources/how-often-should-you-post-on-tiktok/
- Buffer, Instagram posting frequency (2M posts): https://buffer.com/resources/how-often-to-post-on-instagram/
- Buffer, Instagram Reels length: https://buffer.com/resources/instagram-reels-length
- Socialinsider, Instagram Reels length (~140k Reels): https://socialinsider.io/blog/instagram-reels-length/
- Socialinsider, TikTok length: https://www.socialinsider.io/blog/how-long-are-tiktok-videos/
- Adobe Express, YouTube Shorts length survey (507 creators): https://www.adobe.com/express/learn/blog/youtube-shorts-length-study
- ContentGrip, Adobe study summary: https://www.contentgrip.com/youtube-shorts-length-study/
- OpusClip, Shorts length dataset: https://opus.pro/blog/ideal-youtube-shorts-length-format-retention
- OpusClip, TikTok hook formulas: https://www.opus.pro/blog/tiktok-hook-formulas
- Verizon Media/Publicis captions study via Streaming Media: https://www.streamingmedia.com/Articles/News/Online-Video-News/80-of-Video-Caption-Users-Arent-Hearing-Impaired-Finds-Verizon-131860.aspx
- ROI Revolution, TikTok sound research: https://roirevolution.com/blog/july-2021-social-media-water-cooler/
- Kapwing, AI Slop Report: https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/
- The Decoder, Kapwing findings: https://the-decoder.com/one-in-five-youtube-shorts-shown-to-new-users-is-ai-generated-slop-study-finds/
- DayTrading.com, Finance TikTok Report Card: https://www.daytrading.com/tiktok/report-card
- The Daily Upside, misleading finfluencer posts: https://www.thedailyupside.com/advisor/financial-planning/most-finfluential-tiktok-posts-were-already-misleading-now-the-trend-is-worsening/
- Metricool, Reel retention and skip rate: https://metricool.com/instagram-reel-analytics/
- Metricool, TikTok Creator Rewards: https://metricool.com/tiktok-creator-next/
- vidIQ, Shorts monetization and RPM: https://vidiq.com/blog/post/youtube-shorts-monetization/
- vidIQ, YPP 2027 changes: https://vidiq.com/blog/post/youtube-partner-program-changes-2027/
- Subscribr, Shorts analytics benchmarks: https://subscribr.ai/p/youtube-shorts-analytics-metrics-viral
- Bytecap, Shorts retention benchmarks: https://www.bytecap.io/research/youtube-shorts-retention-benchmarks
- Business Today, Humphrey Yang rice video: https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html
- Fortune, TikTok finance influencers (2020): https://fortune.com/2020/03/21/tik-tok-influencers-personal-finance-advice
- Canstar, TikTok money trends (#cashstuffing): https://www.canstar.com.au/budgeting/tiktok-money-trends/

**Third-party claims flagged as unverified (do not cite as fact)**
- Dataslayer, Instagram algorithm 2026: https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers
- Vaizle, Instagram algorithm 2026: https://insights.vaizle.com/new-instagram-algorithm/
- CreatorFlow, Instagram algorithm 2026: https://creatorflow.so/blog/instagram-algorithm-2026/
- AIR Media-Tech, YouTube 2026 month-by-month: https://air.io/en/trending/youtube-algorithm-in-2026-month-by-month-changes-that-affect-your-views
