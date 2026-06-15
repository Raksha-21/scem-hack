import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    fontFamily: 'Helvetica',
    color: '#2D3748',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#0A2342', // Theme Navy
    padding: 18,
    borderRadius: 4,
    marginBottom: 15,
    color: '#FFFFFF',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titleSub: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#FFD700', // Gold accent
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    fontSize: 8.5,
    color: '#E2E8F0',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  contactItem: {
    marginRight: 15,
  },
  bodyContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: '32%',
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  mainContent: {
    width: '68%',
    paddingLeft: 12,
  },
  section: {
    marginBottom: 14,
  },
  sectionHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#0A2342',
    borderBottomWidth: 1,
    borderBottomColor: '#0A2342',
    paddingBottom: 2,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletSymbol: {
    width: 8,
    fontSize: 8,
    color: '#4A5043',
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.3,
    color: '#2D3748',
  },
  metaLabel: {
    fontFamily: 'Helvetica-Bold',
    color: '#4A5043',
    marginBottom: 2,
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  metaValue: {
    marginBottom: 8,
    fontSize: 8.5,
    color: '#2D3748',
  },
  textBlock: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#2D3748',
  }
});

const ResumePDF = ({ data, profileData }: { data: any, profileData: any }) => {
  // Helper to render comma separated skills
  const renderSkills = (skillsText: string) => {
    if (!skillsText) return null;
    const skills = skillsText.split(',').map(s => s.trim()).filter(Boolean);
    return (
      <View style={styles.bulletList}>
        {skills.map((skill, idx) => (
          <View key={idx} style={styles.bulletPoint}>
            <Text style={styles.bulletSymbol}>•</Text>
            <Text style={styles.bulletText}>{skill}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Helper to render text with newlines as bullet points or paragraphs
  const renderListOrText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    
    if (lines.length > 1) {
      return (
        <View style={styles.bulletList}>
          {lines.map((line, idx) => {
            const cleanLine = line.replace(/^[-\*•]\s*/, '');
            return (
              <View key={idx} style={styles.bulletPoint}>
                <Text style={styles.bulletSymbol}>•</Text>
                <Text style={styles.bulletText}>{cleanLine}</Text>
              </View>
            );
          })}
        </View>
      );
    }
    return <Text style={styles.textBlock}>{text}</Text>;
  };

  const name = profileData?.name || `${profileData?.firstName || ''} ${profileData?.lastName || ''}`.trim() || 'Veteran Applicant';
  const roleTitle = profileData?.specialization || 'Transitioning Military Professional';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Banner Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.titleSub}>{roleTitle}</Text>
          
          <View style={styles.contactRow}>
            {profileData?.email && (
              <Text style={styles.contactItem}>Email: {profileData.email}</Text>
            )}
            {profileData?.location && (
              <Text style={styles.contactItem}>Location: {profileData.location}</Text>
            )}
            {profileData?.yearsOfService && (
              <Text style={styles.contactItem}>Service: {profileData.yearsOfService} Years</Text>
            )}
          </View>
        </View>

        {/* Two-Column Body */}
        <View style={styles.bodyContainer}>
          {/* Left Column (Sidebar) */}
          <View style={styles.sidebar}>
            {/* Military Service */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Military Credentials</Text>
              
              {profileData?.branch && (
                <View>
                  <Text style={styles.metaLabel}>Branch</Text>
                  <Text style={styles.metaValue}>{profileData.branch}</Text>
                </View>
              )}
              
              {profileData?.rank && (
                <View>
                  <Text style={styles.metaLabel}>Rank</Text>
                  <Text style={styles.metaValue}>{profileData.rank}</Text>
                </View>
              )}
              
              {profileData?.specialization && (
                <View>
                  <Text style={styles.metaLabel}>MOS/Specialization</Text>
                  <Text style={styles.metaValue}>{profileData.specialization}</Text>
                </View>
              )}
            </View>

            {/* Technical Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Core Skills</Text>
              {renderSkills(data?.skills || profileData?.skills)}
            </View>
          </View>

          {/* Right Column (Main Content) */}
          <View style={styles.mainContent}>
            {/* Professional Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Professional Summary</Text>
              <Text style={styles.textBlock}>{data?.description}</Text>
            </View>

            {/* Military Background / Experience */}
            {profileData?.militaryBackground && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Military Experience & Leadership</Text>
                {renderListOrText(profileData.militaryBackground)}
              </View>
            )}

            {/* Work History */}
            {data?.workExperience && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Work Experience</Text>
                {renderListOrText(data.workExperience)}
              </View>
            )}

            {/* Training & Certifications */}
            {data?.trainingExperience && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Training & Education</Text>
                {renderListOrText(data.trainingExperience)}
              </View>
            )}

            {/* Awards & Achievements */}
            {data?.awards && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Awards & Recognition</Text>
                {renderListOrText(data.awards)}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;