import React, { useState } from 'react';
import styles from "./css/Information.module.css";

const InformationComponent = () => {
  const [activeTab, setActiveTab] = useState("Articulation");

  function openInformation(subject) {
    setActiveTab(subject);
  }
  const buttons = document.querySelectorAll('.container button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove(styles.active));
      button.classList.add(styles.active);
    });
  });

  return (
    <div className={styles.informationDiv}>
      <h2>Learn more</h2>
      <div className={styles.container}>
        <button onClick={() => openInformation('Articulation')} className={styles.active}>Articulation</button>
        <button onClick={() => openInformation('Articulation Test')}>Articulation Test</button>
        <button onClick={() => openInformation('Artificial Intelligence')}>Artificial Intelligence</button>
        <button onClick={() => openInformation('Speech Therapy')}>Speech Therapy</button>
       
      </div>
 <div className={styles.line}></div>
      <div id="Articulation" className={activeTab === 'Articulation' ? styles.tabArticulation : styles.hidden}>
        <div className={styles.content}>
          <p>Articulation is the process of producing speech sounds with clarity and precision. It involves the coordinated movement of the tongue, lips, jaw, and other speech organs to form words and sentences. Effective articulation is essential for clear communication, enabling speakers to convey their thoughts and ideas accurately. Articulation skills develop gradually from infancy through childhood, influenced by factors such as language exposure and oral motor coordination. Speech disorders, such as articulation disorders or phonological disorders, can impact an individual's ability to produce speech sounds accurately.</p>
          <p>Speech therapy techniques, including targeted exercises and interventions, are often used to address these disorders and improve articulation skills. Clear and precise articulation is crucial for success in social, academic, and professional settings. Additionally, articulation plays a vital role in other forms of communication, such as singing and playing musical instruments. Overall, articulation is a fundamental aspect of human communication, facilitating understanding and expression through spoken language and other forms of expression.


</p>
        </div>
      </div>
      <div id="Articulation Test" className={activeTab === 'Articulation Test' ? styles.tabArticulationTest : styles.hidden}>
      <div className={styles.content}>
          <p>Articulation tests are assessments used by speech-language pathologists to evaluate an individual's ability to produce speech sounds accurately. These tests typically involve asking the individual to pronounce specific words, phrases, or sentences aloud. The examiner listens carefully to the individual's speech production, noting any errors in articulation, substitutions, omissions, or distortions of speech sounds. Articulation tests may also assess the consistency of speech sound errors across different contexts and positions within words. </p><p>Results from these tests help clinicians diagnose and plan intervention for speech disorders, such as articulation disorders or phonological disorders. Articulation tests are often standardized and may include normative data for comparison with typical development or other individuals of similar age or linguistic background. These assessments provide valuable information about an individual's speech abilities and guide the development of targeted therapy goals and strategies to improve articulation skills.</p>
        </div>
      </div>

      <div id="Artificial Intelligence" className={activeTab === 'Artificial Intelligence' ? styles.tabSpeechTherapy : styles.hidden}>
      <div className={styles.content}>
          <p>Artificial intelligence, particularly through machine learning algorithms, can be employed to assess articulation in various ways. These systems analyze speech recordings to detect patterns and errors in pronunciation. By training on large datasets of accurately labeled speech samples, AI models can learn to recognize deviations from standard articulation. These AI-based systems can provide real-time feedback on pronunciation accuracy, helping individuals improve their articulation skills. Moreover, AI can assist speech-language pathologists in diagnosing and monitoring speech disorders by analyzing articulation patterns more efficiently. Leveraging advanced algorithms, AI technology continues to advance the accuracy and effectiveness of articulation assessment, contributing to more personalized and accessible speech therapy interventions.</p>
        </div>
      </div>

      <div id="Speech Therapy" className={activeTab === 'Speech Therapy' ? styles.tabAI : styles.hidden}>
      <div className={styles.content}>
          <p>Speech therapy, also known as speech-language therapy, is a specialized field aimed at assessing, diagnosing, and treating communication disorders. These disorders may affect speech, language, voice, fluency, or swallowing abilities. Speech therapists, or speech-language pathologists, work with individuals of all ages, from infants to seniors, who experience difficulties in communication due to various reasons such as developmental delays, neurological conditions, or injuries. </p>
          <p> During therapy sessions, speech-language pathologists employ a variety of techniques and exercises tailored to the individual's specific needs and goals. These may include articulation drills, language exercises, voice therapy, fluency techniques, and swallowing therapy. Speech therapy aims to improve communication skills, enhance verbal expression, increase comprehension abilities, and promote overall functional independence in daily life. It also plays a crucial role in addressing social, academic, and professional challenges associated with communication disorders. With a multidisciplinary approach, speech therapy often involves collaboration with other healthcare professionals, educators, and family members to ensure comprehensive care and support for the individual's communication needs.</p>
        </div>
      </div>
    </div>
  );
}

export default InformationComponent;
