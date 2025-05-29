import Footer from "@/components/Footer";
import VendorNavbar from "@/components/vendor/NavBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | Osiso Bookings",
  description: "Read the terms and conditions for using Osiso Bookings.",
};

const PrivacyPolicy = () => {
  return (
    <>
      <main className="max-w-[1000px] lg:min-w-[920px] mx-auto mt-20 p-6 sm:p-10">
        <VendorNavbar />
        <h1 className="text-[22px] md:text-[32px] text-[#6C35A7] font-bold">
          Privacy Policy for Osiso Bookings
        </h1>
        <section className="text-[18px] leading-[30px] md:leading-[40px] space-y-6 font-medium">
          <h2 className=" font-bold mb-2">Last Updated: May 15th 2025</h2>
          <p className="">
            Welcome to Osiso Bookings ("we," "us," "our," or "Osiso Bookings").
            We are committed to protecting your privacy and handling your
            personal data in an open and transparent manner. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our platform, which helps businesses create
            service cards and get a sharable micro-site (the "Service").  
            <br />
            Please read this Privacy Policy carefully. If you do not agree with
            the terms of this privacy policy, please do not access or use the
            Service.  
          </p>
          <div className="">
            <h3 className="font-bold">1. Data Controller</h3>
            <p>
              Osiso Bookings is the controller of your personal data. 
              <br />
              Contact Email: Info@osisobookings.com 
              <br />
              If you are using the Service on behalf of an entity, organization,
              or company, you represent and warrant that you have the authority
              to bind that organization to these Terms and you agree to be bound
              by these Terms on behalf of that organization.
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">2. Information We Collect</h3>
            <p>
              We may collect information about you in a variety of ways. The
              information we may collect via the Service includes:
              <ul className="list-disc list-inside">
                <li>
                  Personal Identification Information (PII): When you register
                  for an account or use our Service, we may collect personal
                  information such as your name, email address, phone number,
                  business name  
                </li>
                <li>
                  User-Generated Content (UGC): We collect information and
                  content you create, share, or post when using our Service to
                  create service cards and micro-sites. This includes text,
                  images, service details, and other materials you choose to
                  provide.
                </li>
                <li>
                  Cookies and Tracking Technologies: We use cookies and similar
                  tracking technologies (like web beacons and pixels) to collect
                  information about your Browse activities, device information,
                  and interaction with our Service. This may include your IP
                  address, browser type, operating system, access times, and the
                  pages you have viewed directly before and after accessing the
                  Service. You can control cookies through your browser settings
                  and other tools.  
                </li>
                <li>
                  Information from Third-Party Services: We may collect
                  information from third-party services if you connect them to
                  your Osiso Bookings account or use them to register (e.g.,
                  social media logins, if applicable). The information we
                  receive depends on your privacy settings with those third
                  parties.   
                </li>
              </ul>
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">3. How We Collect Your Information</h3>
            <p>
              We collect information:
              <ul className="list-disc list-inside">
                <li>
                  Directly from you: When you register for an account, create or
                  update your service card or micro-site, communicate with us
                  (e.g., for customer support), or otherwise provide it to us.
                </li>
                <li>
                  Automatically when you use the Service: Through cookies and
                  other tracking technologies as described above.
                </li>
                <li>From third-party sources: As described in Section 2.</li>
              </ul>
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">4. How We Use Your Information</h3>
            <p>
              Having accurate information about you permits us to provide you
              with a smooth, efficient, and customized experience. Specifically,
              we may use information collected about you via the Service to:
              <ul className="list-disc list-inside">
                <li>Create and manage your account. </li>
                <li>
                  Provide, operate, and maintain our Service, including the
                  creation of service cards and micro-sites.
                </li>
                <li>
                  Personalize your user experience and tailor content and
                  offerings relevant to your interests.
                </li>
                <li>
                  Provide customer support and respond to your inquiries and
                  requests. Send you administrative information, such as updates
                  to our terms, conditions, and policies.
                </li>
                <li>
                  Send you marketing and promotional communications, where
                  permitted by law and with your consent where required. You can
                  opt-out of receiving these communications at any time (see
                  "Your Data Protection Rights" below).
                </li>
                <li>
                  Monitor and analyze usage and trends to improve our Service
                  and user experience.
                </li>
                <li>
                  Prevent fraudulent activity, maintain the security of our
                  Service, and enforce our terms of service.
                </li>
                Comply with legal obligations. 
              </ul>
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">
              5. Legal Basis for Processing Your Personal Data (GDPR)
            </h3>
            <p>
              If you are in the European Economic Area (EEA) or the UK, we
              process your personal data under the following legal bases:
              <ul className="list-disc list-inside">
                <li>
                  Consent: We will process your personal data for certain
                  purposes (e.g., sending marketing communications, using
                  certain types of cookies) if you have provided your explicit
                  consent. You can withdraw your consent at any time.
                </li>
                <li>
                  Performance of a Contract: We process your personal data to
                  provide the Service to you, as set out in our Terms of
                  Service. This includes creating your account, enabling you to
                  create service cards, and providing customer support.
                </li>
                <li>
                  Legal Obligation: We may process your personal data to comply
                  with a legal obligation, such as responding to a court order
                  or a regulator.
                </li>
              </ul>
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">6. Disclosure of Your Information</h3>
            <p>
              We do not sell your personal information. We may share information
              we have collected about you in certain situations:
              <ul className="list-disc list-inside">
                <li>
                  With Service Providers: We may share your information with
                  third-party vendors, consultants, and other service providers
                  who perform services on our behalf. This includes:  
                </li>
                <li>
                  Payment Processors: To process payments you make through the
                  Service PAYSTACK.  We do not store or collect your payment
                  card details. That information is provided directly to our
                  third-party payment processors whose use of your personal
                  information is governed by their Privacy Policy.
                </li>
                <li>
                  [Other service providers, e.g., cloud hosting providers,
                  analytics providers, email service providers, customer support
                  tools. Be specific if you can.] These service providers will
                  only have access to your information to the extent necessary
                  to perform their functions and are obligated to protect your
                  information.
                </li>
                <li>
                  By Law or to Protect Rights: If we believe the release of
                  information about you is necessary to respond to legal
                  process, to investigate or remedy potential violations of our
                  policies, or to protect the rights, property, and safety of
                  others, we may share your information as permitted or required
                  by any applicable law, rule, or regulation.  
                </li>
                <li>
                  Business Transfers: We may share or transfer your information
                  in connection with, or during negotiations of, any merger,
                  sale of company assets, financing, or acquisition of all or a
                  portion of our business to another company. You will be
                  notified via email and/or a prominent notice on our Service of
                  any change in ownership or uses of your personal
                  information.  
                </li>
                <li>
                  With Your Consent: We may disclose your personal information
                  for any other purpose with your consent.  
                </li>
              </ul>
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">7. Data Security</h3>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your personal information. This includes:
              <ul className="list-disc list-inside">
                <li>Encryption of data  </li>
                <li>
                  [Specify where possible, e.g., data in transit using SSL/TLS,
                  data at rest]
                </li>
                <li>
                  Access controls to limit access to personal data to authorized
                  personnel.
                </li>
                <li>Secure servers and IT infrastructure.</li>
              </ul>
              While we have taken reasonable steps to secure the personal
              information you provide to us, please be aware that despite our
              efforts, no security measures are perfect or impenetrable, and no
              method of data transmission can be guaranteed against any
              interception or other type of misuse. Any information disclosed
              online is vulnerable to interception and misuse by unauthorized
              parties. Therefore, we cannot guarantee complete security if you
              provide personal information.
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">8. Data Retention</h3>
            <p>
              We will retain your personal information only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use your information to the extent necessary to comply
              with our legal obligations (for example, if we are required to
              retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies. <br />
              For User-Generated Content, it will be retained as long as your
              account is active or as needed to provide you the Services. If you
              delete your account, all information is deleted also
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">
              9. Your Data Protection Rights (GDPR and other applicable laws)
            </h3>
            <p>
              Depending on your location and subject to applicable law, you may
              have the following rights regarding your personal data:
              <ul className="list-disc list-inside">
                <li>
                  The right to access: You have the right to request copies of
                  your personal data. 
                </li>
                <li>
                  The right to rectification: You have the right to request that
                  we correct any information you believe is inaccurate or
                  complete information you believe is incomplete.  
                </li>
                <li>
                  The right to erasure (Right to be forgotten): You have the
                  right to request that we erase your personal data, under
                  certain conditions.  
                </li>
                <li>
                  The right to restrict processing: You have the right to
                  request that we restrict the processing of your personal data,
                  under certain conditions.
                </li>
                <li>
                  The right to object to processing: You have the right to
                  object to our processing of your personal data, under certain
                  conditions, particularly where we process your data based on
                  legitimate interests or for direct marketing.
                </li>
                <li>
                  The right to data portability: You have the right to request
                  that we transfer the data that we have collected to another
                  organization, or directly to you, under certain conditions.  
                </li>
                <li>
                  The right to withdraw consent: If we are processing your
                  personal data based on your consent, you have the right to
                  withdraw that consent at any time.   
                </li>
                <li>
                  The right to lodge a complaint: You have the right to lodge a
                  complaint with a supervisory authority if you believe that our
                  processing of your personal data infringes applicable data
                  protection laws.  
                </li>
                <li>
                  [For GDPR, this would be a data protection authority in an EU
                  member state. For Nigeria, this would be the Nigeria Data
                  Protection Commission (NDPC)]
                </li>
              </ul>
              To exercise any of these rights, please contact us at
              Info@osisobookings.com. We will respond to your request within the
              timeframes required by applicable law. We may need to verify your
              identity before processing your request.
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">
              10. Cookies and Tracking Technologies  
            </h3>
            <p>
              We use cookies and similar tracking technologies to provide and
              improve our Service. Cookies are small data files stored on your
              hard drive or in device memory that help us improve our Service
              and your experience, see which areas and features of our Service
              are popular, and count visits.   You can typically remove or
              reject cookies via your browser settings. To do this, follow the
              instructions provided by your browser (usually located within the
              "settings," "help" "tools" or "edit" facility). Many browsers are
              set to accept cookies until you change your settings.  
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">11. International Data Transfers  </h3>
            <p>
              Your information, including personal data, may be transferred to —
              and maintained on — computers located outside of your state,
              province, country, or other governmental jurisdiction where the
              data protection laws may differ from those of your jurisdiction.  
              <br />
              If you are located in the European Economic Area (EEA), UK, or
              Switzerland, your personal data may be transferred to countries
              outside of these regions. We will take all steps reasonably
              necessary to ensure that your data is treated securely and in
              accordance with this Privacy Policy and that appropriate
              safeguards are in place to protect your personal data, such as
              Standard Contractual Clauses (SCCs) approved by the European
              Commission, or other legally recognized transfer mechanisms.  
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">12. Children's Privacy</h3>
            <p>
              Our Service is not intended for use by children under the age of
              18. We do not knowingly collect personal information from children
              under this age. If we become aware that we have collected personal
              information from a child without verification of parental consent,
              we will take steps to remove that information from our servers. If
              you believe that we might have any information from or about a
              child, please contact us at Info@osisobookings.com.  
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">13. Changes to This Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date at the top of this
              Privacy Policy. You are advised to review this Privacy Policy
              periodically for any changes. Changes to this Privacy Policy are
              effective when they are posted on this page.  
              <br />
              For significant changes, we may also notify you through other
              means, such as by sending an email or displaying a prominent
              notice on our Service.
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">14. Contact Us  </h3>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us at:  
              <br />
              Osiso Bookings Email: Info@osisobookings.com 
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">15. Miscellaneous</h3>
            <p>
              <ul className="list-disc list-inside">
                <li>
                  Entire Agreement: These Terms, together with our Privacy
                  Policy, constitute the entire agreement between you and Osiso
                  Bookings regarding your use of the Service and supersede all
                  prior and contemporaneous understandings, agreements,
                  representations, and warranties, both written and oral,
                  regarding the Service.
                </li>
                <li>
                  Severability: If any provision of these Terms is held by a
                  court or other tribunal of competent jurisdiction to be
                  invalid, illegal, or unenforceable for any reason, such
                  provision shall be eliminated or limited to the minimum extent
                  such that the remaining provisions of the Terms will continue
                  in full force and effect.
                </li>
                <li>
                  Waiver: No waiver by Osiso Bookings of any term or condition
                  set out in these Terms shall be deemed a further or continuing
                  waiver of such term or condition or a waiver of any other term
                  or condition, and any failure of Osiso Bookings to assert a
                  right or provision under these Terms shall not constitute a
                  waiver of such right or provision.
                </li>
                <li>
                  Assignment: You may not assign any of your rights or delegate
                  any of your obligations under these Terms without our prior
                  written consent. Osiso Bookings may assign its rights and
                  obligations under these Terms without your consent.
                </li>
                <li>
                  Notices: All notices or other communications to Osiso Bookings
                  under these Terms should be sent to Info@osisobookings.com.
                </li>
              </ul>
            </p>
          </div>
          <div className="">
            <h3 className="font-bold">16. Contact Information  </h3>
            <p>
              If you have any questions about these Terms, please contact us at: <br />
              Osiso Bookings Email: Info@osisobookings.com
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
