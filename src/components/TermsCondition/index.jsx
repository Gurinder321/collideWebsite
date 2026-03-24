import { useModal } from '@/context/modalContext'
import React from 'react'

const TermsConditions = () => {
  const {closeModal} = useModal()
  return (

  <div class="bg-white rounded-lg shadow-lg max-w-3xl w-full p-5 z-50">

    <div class="border-b  pb-2 mb-2 sm:mb-4">
      <h2 class="sm:text-lg text-base font-bold text-[#bb87c9] uppercase tracking-widest">
        Terms & Conditions
      </h2>
    </div>

    <div class="space-y-4 text-gray-700  ">
      <h3 class="sm:text-xl text-base text-[#bb87c9] font-semibold mt-2 sm:mt-6">Privacy Policy </h3>
      <p className='font-montserrat sm:text-base text-[12px] text-justify '>
      Your privacy is important to me. When you sign up for my newsletter, I collect your email address to share updates, exclusive previews, behind-the-scenes content, and the occasional giveaway or surprise. I will never share, sell, or distribute your information to third parties. This newsletter is intended for readers 18 and older, as some content may include adult themes or explicit material not suitable for younger audiences. If at any time you no longer wish to receive my emails, you can unsubscribe by clicking the “unsubscribe” link at the bottom of any message. 
      </p>
      
      <h3 class="sm:text-xl text-base text-[#bb87c9] font-semibold mt-2 sm:mt-6">Terms of Service</h3>
      <p className='font-montserrat sm:text-base text-[12px] text-justify '>
      By subscribing to my newsletter, you agree to receive regular updates, including announcements about my books, giveaways, upcoming projects, and other related content. This newsletter is intended for readers 18+ due to the possibility of adult themes or explicit material. I reserve the right to make changes to the content, frequency, or format of the newsletter at any time. All content shared is for personal use only and may not be reproduced, distributed, or shared without permission. You can unsubscribe at any time, and your email will be handled in accordance with my privacy policy. Thank you for being part of this community—I’m so happy to have you here!
      </p>
    </div>

    <div class="flex justify-end mt-6">
      <button
        class="bg-[#d394e2] w-28 hover:bg-[#c28bd0] text-white font-semibold sm:py-2
        px-3 py-1 sm:px-4 rounded"
        onClick={closeModal}
      >
        OK
      </button>
    </div>
  </div>


  )
}

export default TermsConditions