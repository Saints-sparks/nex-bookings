import Footer from "@/components/Footer";
import VendorNavbar from "@/components/vendor/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Osiso Bookings",
  description: "Read the terms and conditions for using Osiso Bookings.",
};

export default function TermsOfServicePage() {
  return (
    <><main className="max-w-[1000px] lg:min-w-[920px] mx-auto mt-20 p-6 sm:p-10">
          <VendorNavbar />
          <h1 className="text-[22px] md:text-[32px] text-[#6C35A7] font-bold">
              Terms of Service for Osiso Bookings
          </h1>
          <section className="text-[18px] leading-[30px] md:leading-[40px] space-y-6 font-medium">
              <h2 className=" font-bold mb-2">Last Updated: May 15th 2025</h2>
              <p className="">
                  Welcome to Osiso Bookings! <br />
                  These Terms of Service ("Terms") govern your access to and use of the
                  Osiso Bookings platform, including our website, any mobile
                  applications, and services (collectively, the "Service") provided by
                  Osiso Bookings ("Osiso Bookings," "we," "us," or "our"). Our Service
                  enables businesses ("Users," "you," "your") to create service cards
                  and obtain a sharable micro-site. By accessing or using our Service,
                  you agree to be bound by these Terms and our Privacy Policy (which is
                  incorporated herein by reference). If you do not agree to these Terms,
                  you may not access or use our Service.
              </p>
              <div className="">
                  <h3 className="font-bold">1. Acceptance of Terms</h3>
                  <p>
                      By registering for and/or using the Service in any manner, you agree
                      to these Terms and all other operating rules, policies, and
                      procedures that may be published from time to time on the Service by
                      us, each of which is incorporated by reference.
                      <br />
                      If you are using the Service on behalf of an entity, organization,
                      or company, you represent and warrant that you have the authority to
                      bind that organization to these Terms and you agree to be bound by
                      these Terms on behalf of that organization.
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">2. Description of Service</h3>
                  <p>
                      Osiso Bookings provides a platform for businesses to:
                      <ul className="list-disc list-inside">
                          <li>Create digital service cards detailing their offerings.</li>
                          <li>
                              Generate a sharable micro-site to showcase these service cards
                              and related business information.
                          </li>
                          <li>Receive bookings notifications for services created.</li>
                      </ul>
                      We reserve the right to modify, suspend, or discontinue the Service
                      (or any part or content thereof) at any time with or without notice
                      to you. We will not be liable to you or to any third-party for any
                      modification, suspension, or discontinuance of the Service.
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">3. User Accounts</h3>
                  <p>
                      <ul className="list-disc list-inside">
                          <li>
                              Registration: To access and use certain features of the Service,
                              you must register for an account ("Account"). When you register
                              for an Account, you agree to provide true, accurate, current,
                              and complete information as prompted by the registration form.
                          </li>
                          <li>
                              Account Responsibilities: You are responsible for maintaining
                              the confidentiality of your Account login information (username
                              and password) and are fully responsible for all activities that
                              occur under your Account. You agree to immediately notify Osiso
                              Bookings of any unauthorized use, or suspected unauthorized use
                              of your Account or any other breach of security. Osiso Bookings
                              cannot and will not be liable for any loss or damage arising
                              from your failure to comply with this section.
                          </li>
                          <li>
                              Eligibility: You must be at least 18 years old to use the
                              Service, or the age of legal majority in your jurisdiction if
                              different. By agreeing to these Terms, you represent and warrant
                              to us that you are of legal age to form a binding contract.
                          </li>
                      </ul>
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">4. User Generated Content (UGC)</h3>
                  <p>
                      <ul className="list-disc list-inside">
                          <li>
                              Your Content: As part of the Service, you may create, upload,
                              post, send, receive, and store content, such as text, photos,
                              service descriptions, pricing, business logos, and other
                              materials ("User-Generated Content" or "UGC") for your service
                              cards and micro-sites.
                          </li>
                          <li>
                              Ownership of UGC: You retain ownership of any intellectual
                              property rights that you hold in your UGC.
                          </li>
                          <li>
                              License to Osiso Bookings: By creating, uploading, or otherwise
                              submitting UGC to the Service, you grant Osiso Bookings a
                              worldwide, non-exclusive, royalty-free, sublicensable, and
                              transferable license to use, reproduce, distribute, prepare
                              derivative works of, display, and perform the UGC in connection
                              with the Service and Osiso Bookings' (and its successors' and
                              affiliates') business, including for promoting and
                              redistributing part or all of the Service. This license is
                              solely for the purpose of operating, developing, providing,
                              promoting, and improving the Service and researching and
                              developing new ones. This license continues even if you stop
                              using our Services (for example, for content that has been
                              shared publicly or with others who have not deleted it).
                          </li>
                          <li>
                              Responsibility for UGC: You are solely responsible for your UGC
                              and the consequences of posting or publishing it. You represent
                              and warrant that:
                              <ul className="list-disc list-inside ml-6">
                                  <li>
                                      You own or have the necessary licenses, rights, consents,
                                      and permissions to publish UGC you submit;
                                  </li>
                                  <li>
                                      Your UGC does not infringe any third party's intellectual
                                      property rights (including copyright, trademark, or patent
                                      rights), rights of publicity or privacy, or any other legal
                                      or moral rights;
                                  </li>
                                  <li>
                                      Your UGC is not defamatory, libelous, obscene, pornographic,
                                      harassing, hateful, or otherwise unlawful;
                                  </li>
                                  Your UGC does not violate any applicable law or regulation.
                              </ul>
                          </li>
                          <li>
                              Monitoring and Removal: Osiso Bookings has the right (but not
                              the obligation) to review, monitor, or remove your UGC, at our
                              sole discretion and at any time and for any reason, without
                              notice to you.
                          </li>
                      </ul>
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">5. Acceptable Use Policy</h3>
                  <p>
                      You agree not to use the Service for any purpose that is prohibited
                      by these Terms or by applicable law. You are responsible for all of
                      your activity in connection with the Service. You shall not (and
                      shall not permit any third party to):
                      <ul className="list-disc list-inside">
                          <li>
                              Engage in any fraudulent, abusive, or otherwise illegal
                              activity.
                          </li>
                          <li>
                              Upload or transmit viruses, worms, Trojan horses, or other
                              malicious code.
                          </li>
                          <li>
                              Attempt to gain unauthorized access to any portion of the
                              Service, other Accounts, computer systems, or networks connected
                              to the Service, whether through hacking, password mining, or any
                              other means.
                          </li>
                          <li>
                              Use the Service to harass, abuse, defame, or otherwise infringe
                              or violate the rights of any other party.
                          </li>{" "}
                          <li>
                              Use the Service to build a competitive product or service.
                          </li>{" "}
                          <li>
                              Interfere with or disrupt the integrity or performance of the
                              Service or the data contained therein.
                          </li>
                      </ul>
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">6. Fees and Payment</h3>
                  <p>
                      You agree not to use the Service for any purpose that is prohibited
                      by these Terms or by applicable law. You are responsible for all of
                      your activity in connection with the Service. You shall not (and
                      shall not permit any third party to):
                      <ul className="list-disc list-inside">
                          <li>
                              Service Fees: Certain features of the Service may be provided
                              for a fee. If you elect to use paid features, you agree to the
                              pricing and payment terms as we may update them from time to
                              time. Osiso Bookings may add new services for additional fees
                              and charges, or amend fees and charges for existing services, at
                              any time in its sole discretion.
                          </li>
                          <li>
                              Billing: We use a third-party payment processor (Paystack) to
                              bill you through a payment account linked to your Account on the
                              Service. The processing of payments will be subject to the
                              terms, conditions, and privacy policies of the Payment Processor
                              in addition to these Terms. We are not responsible for errors by
                              the Payment Processor.
                          </li>
                          <li>
                              Recurring Billing: Some of our Services may consist of an
                              initial period, for which there is a one-time charge, followed
                              by recurring period charges as agreed to by you. By choosing a
                              recurring payment plan, you acknowledge that such Services have
                              an initial and recurring payment feature and you accept
                              responsibility for all recurring charges prior to
                              cancellation.
                          </li>
                          <li>
                              Subscription Cancellation:  You may cancel your Subscription at
                              any time; however, there are no refunds for cancellation except
                              as may be required by applicable law. If you cancel, your
                              subscription will remain active until the end of the current
                              billing cycle.
                          </li>
                          <li>
                              Refunds: Paid fees are non-refundable except as required by law
                              or as otherwise specifically stated herein.
                          </li>
                          <li>
                              Taxes: All fees are exclusive of applicable national,
                              provincial, state, local or other taxes ("Taxes"), unless
                              otherwise stated. You are responsible for all applicable Taxes.
                          </li>
                      </ul>
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">7. Intellectual Property Rights</h3>
                  <p>
                      <ul className="list-disc list-inside">
                          <li>
                              Our IP: Excluding your UGC, you acknowledge that all
                              intellectual property rights, including copyrights, patents,
                              trademarks, and trade secrets, in the Service and its content
                              (collectively, "Osiso Bookings IP") are owned by Osiso Bookings
                              or Osiso Bookings' licensors. Neither these Terms nor your
                              access to the Service transfers to you or any third party any
                              rights, title, or interest in or to such Osiso Bookings IP,
                              except for the limited access rights expressly set forth herein.
                              Osiso Bookings and its licensors reserve all rights not granted
                              in these Terms.
                          </li>
                          <li>
                              Feedback: If you provide Osiso Bookings with any feedback or
                              suggestions regarding the Service ("Feedback"), you hereby
                              assign to Osiso Bookings all rights in such Feedback and agree
                              that Osiso Bookings shall have the right to use and fully
                              exploit such Feedback and related information in any manner it
                              deems appropriate.
                          </li>
                      </ul>
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">8. Third-Party Links and Services</h3>
                  <p>
                      The Service may contain links to third-party websites or services
                      that are not owned or controlled by Osiso Bookings. We have no
                      control over, and assume no responsibility for, the content, privacy
                      policies, or practices of any third-party websites or services. You
                      further acknowledge and agree that Osiso Bookings shall not be
                      responsible or liable, directly or indirectly, for any damage or
                      loss caused or alleged to be caused by or in connection with the use
                      of or reliance on any such content, goods, or services available on
                      or through any such websites or services. We encourage you to be
                      aware when you leave the Service and to read the terms and
                      conditions and privacy policy of each third-party website or service
                      that you visit.
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">9. Disclaimer of Warranties</h3>
                  <p>
                      THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS,
                      WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
                      INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
                      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
                      NON-INFRINGEMENT.
                      <br />
                      OSISO BOOKINGS DOES NOT WARRANT THAT: (A) THE SERVICE WILL BE SECURE
                      OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (B) ANY DEFECTS OR
                      ERRORS WILL BE CORRECTED; (C) ANY CONTENT OR SOFTWARE AVAILABLE AT
                      OR THROUGH THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL
                      COMPONENTS; OR (D) THE RESULTS OF USING THE SERVICE WILL MEET YOUR
                      REQUIREMENTS. YOUR USE OF THE SERVICE IS SOLELY AT YOUR OWN RISK.
                      <br />
                      SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES,
                      SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">10. Limitation of Liability  </h3>
                  <p>
                      TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
                      OSISO BOOKINGS, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS,
                      SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE,
                      INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING
                      WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA,
                      OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE
                      OF, OR INABILITY TO USE, THE SERVICE.
                      <br />
                      UNDER NO CIRCUMSTANCES WILL OSISO BOOKINGS' TOTAL LIABILITY ARISING
                      OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE OF OR
                      INABILITY TO USE THE SERVICE EXCEED THE AMOUNTS YOU HAVE PAID TO
                      OSISO BOOKINGS FOR USE OF THE SERVICE IN THE [E.G., THREE (3)
                      MONTHS] PERIOD PRIOR TO THE EVENT GIVING RISE TO THE LIABILITY, OR,
                      IF YOU HAVE NOT HAD ANY PAYMENT OBLIGATIONS TO OSISO BOOKINGS, ONE
                      HUNDRED NIGERIAN NAIRA (NGN 100.00)
                      <br />
                      THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS
                      OF THE BASIS OF THE BARGAIN BETWEEN OSISO BOOKINGS AND YOU.
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">11. Indemnification  </h3>
                  <p>
                      You agree to defend, indemnify, and hold harmless Osiso Bookings,
                      its affiliates, licensors, and service providers, and its and their
                      respective officers, directors, employees, contractors, agents,
                      licensors, suppliers, successors, and assigns from and against any
                      claims, liabilities, damages, judgments, awards, losses, costs,
                      expenses, or fees (including reasonable attorneys' fees) arising out
                      of or relating to your violation of these Terms or your use of the
                      Service, including, but not limited to, your User-Generated Content,
                      any use of the Service's content, services, and products other than
                      as expressly authorized in these Terms, or your use of any
                      information obtained from the Service.
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">12. Term and Termination</h3>
                  <p>
                      <ul className="list-disc list-inside">
                          <li>
                              Term: These Terms shall remain in full force and effect while
                              you use the Service.
                          </li>
                          <li>
                              Termination by You: You may terminate your Account at any time
                              and for any reason
                          </li>
                          <li>
                              Termination by Osiso Bookings: We may suspend or terminate your
                              rights to use the Service (including your Account) at any time
                              for any reason at our sole discretion, including for any use of
                              the Service in violation of these Terms. Upon termination of
                              your rights under these Terms, your Account and right to access
                              and use the Service will terminate immediately.
                          </li>
                          <li>
                              Effect of Termination: Upon termination, all provisions of these
                              Terms which by their nature should survive, will survive,
                              including, without limitation, ownership provisions, warranty
                              disclaimers, indemnity, and limitations of liability.
                          </li>
                      </ul>
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">
                      13. Governing Law and Dispute Resolution
                  </h3>
                  <p>
                      <ul className="list-disc list-inside">
                          <li>
                              Governing Law: These Terms and any dispute or claim arising out
                              of, or related to them, their subject matter or their formation
                              (in each case, including non-contractual disputes or claims)
                              shall be governed by and construed in accordance with the laws
                              of the Federal Republic of Nigeria, without giving effect to any
                              choice or conflict of law provision or rule.
                          </li>

                          <li>
                              Dispute Resolution: [Choose one or combine, and consult a
                              lawyer]
                              <ul className="list-disc list-inside ml-6">
                                  <li>
                                      Option 1 (Negotiation/Mediation): You agree to first try to
                                      resolve any dispute informally by contacting Osiso Bookings
                                      at Info@osisobookings.com. If a dispute is not resolved
                                      within 60 days of submission, you or Osiso Bookings may
                                      bring a formal proceeding.
                                  </li>
                                  <li>
                                      Option 2 (Arbitration): Any dispute arising out of or
                                      relating to these Terms, including any question regarding
                                      its existence, validity, or termination, shall be referred
                                      to and finally resolved by arbitration under the Arbitration
                                      and Conciliation Act, Cap A18, Laws of the Federation of
                                      Nigeria 2004. The number of arbitrators shall be one. The
                                      seat, or legal place, of arbitration shall be Lagos,
                                      Nigeria. The language to be used in the arbitral proceedings
                                      shall be English.
                                  </li>
                                  <li>
                                      Option 3 (Courts): Any legal suit, action, or proceeding
                                      arising out of, or related to, these Terms or the Service
                                      shall be instituted exclusively in the federal or state
                                      courts located in Lagos, Nigeria, although we retain the
                                      right to bring any suit, action, or proceeding against you
                                      for breach of these Terms in your country of residence or
                                      any other relevant country. You waive any and all objections
                                      to the exercise of jurisdiction over you by such courts and
                                      to venue in such courts.
                                  </li>
                              </ul>
                          </li>
                      </ul>
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">14. Changes to Terms  </h3>
                  <p>
                      We reserve the right, at our sole discretion, to modify or replace
                      these Terms at any time. If a revision is material, we will provide
                      at least 30 days' notice prior to any new terms taking effect. What
                      constitutes a material change will be determined at our sole
                      discretion.
                      <br />
                      By continuing to access or use our Service after those revisions
                      become effective, you agree to be bound by the revised terms. If you
                      do not agree to the new terms, in whole or in part, please stop
                      using the website and the Service.
                  </p>
              </div>
              <div className="">
                  <h3 className="font-bold">15. Miscellaneous</h3>
                  <p>
                      <ul className="list-disc list-inside">
                          <li>
                              Entire Agreement: These Terms, together with our Privacy Policy,
                              constitute the entire agreement between you and Osiso Bookings
                              regarding your use of the Service and supersede all prior and
                              contemporaneous understandings, agreements, representations, and
                              warranties, both written and oral, regarding the Service.
                          </li>
                          <li>
                              Severability: If any provision of these Terms is held by a court
                              or other tribunal of competent jurisdiction to be invalid,
                              illegal, or unenforceable for any reason, such provision shall
                              be eliminated or limited to the minimum extent such that the
                              remaining provisions of the Terms will continue in full force
                              and effect.
                          </li>
                          <li>
                              Waiver: No waiver by Osiso Bookings of any term or condition set
                              out in these Terms shall be deemed a further or continuing
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
                      If you have any questions about these Terms, please contact us at:
                      Osiso Bookings Email: Info@osisobookings.com
                  </p>
              </div>
          </section>
      </main><Footer /></>
  );
}
