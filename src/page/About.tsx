import { motion } from "framer-motion";

const About = () => {
  return (
    <div>
      {/* Heading with Slide Down Animation */}
      <motion.section
        className="text-center py-4"
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl gradient-title font-semibold">
          About Nexus Society
        </h1>
      </motion.section>

      {/* Our Mission Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-6 md:px-16 py-10">
        <motion.img
          src="./image8.jpg"
          alt="Mission"
          className="w-full rounded-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold mb-5">Our Mission</h2>
          <p className="text-gray-800 font-semibold leading-normal tracking-wider">
            At NexusSociety, our mission is to redefine the way college
            societies operate and host events. We aim to provide a centralized
            platform that simplifies planning, coordination, and communication
            for all student-led activities. By streamlining workflows, we
            empower societies to focus more on creativity and impact. We believe
            every event should be an experience, and every idea deserves the
            right execution. Our goal is to make campus life more vibrant,
            inclusive, and well-organized.
          </p>
          <br />
          <p className="text-gray-800 font-semibold leading-normal tracking-wider">
            We strive to build a culture where collaboration meets innovation.
            NexusSociety bridges the gap between students, coordinators, and
            administration, making event approvals, updates, and registrations
            smoother than ever. With real-time updates, task management, and
            transparent communication, we help societies manage everything from
            small meetups to grand fests with ease. Our mission is to be the
            digital backbone behind every successful event on campus. Together,
            we celebrate ideas, energy, and student spirit.
          </p>
          <br />
        </motion.div>
      </section>

      {/* Why NexusSociety Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-6 md:px-16 py-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold mb-4">Why NexusSociety?</h2>
          <p className="text-gray-800 font-semibold leading-normal tracking-wider">
            NexusSociety isn't just a tool—it's a complete solution crafted
            specifically for the dynamic world of college societies and event
            management. We understand the hustle behind every fest, every
            workshop, and every society meetup. That's why we bring everything
            under one roof—task tracking, member coordination, event updates,
            and approval flows—all streamlined for smooth execution. Say goodbye
            to endless WhatsApp threads, last-minute confusion, and lost
            deadlines. With NexusSociety, your society becomes smarter, faster,
            and more organized.
          </p>
          <br />
          <p className="text-gray-800 font-semibold leading-normal tracking-wider">
            What sets us apart is our deep focus on empowering student leaders
            with real-time tools that mirror professional event management. Our
            platform enhances collaboration, boosts productivity, and encourages
            creative freedom while ensuring accountability. Whether you're a
            society head, a volunteer, or part of the organizing committee,
            NexusSociety gives everyone the clarity they need to perform better.
            We’re not just here to manage events—we’re here to uplift your
            entire campus experience.
          </p>
        </motion.div>

        <motion.img
          src="image10.jpeg"
          alt="Vision"
          className="w-full rounded-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        />
      </section>
    </div>
  );
};

export default About;
