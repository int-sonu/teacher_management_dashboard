import React from "react";
import { Box, Typography, Divider, Grid, Avatar } from "@mui/material";
import { Mail, Phone, MapPin, BookOpen, Calendar } from "lucide-react";

interface TeacherDetailProps {
  teacher: any;
}

const TeacherDetail: React.FC<TeacherDetailProps> = ({ teacher }) => {
  if (!teacher) return null;

  return (
    <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar 
          sx={{ width: 64, height: 64, bgcolor: 'primary.main', mr: 2, fontSize: '1.5rem' }}
        >
          {teacher.name?.charAt(0)?.toUpperCase() || 'T'}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            {teacher.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <BookOpen size={16} style={{ marginRight: 8 }} />
            {teacher.subject}
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mt: 1 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Mail size={20} style={{ color: '#64748b', marginRight: 12, marginTop: 2 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Email</Typography>
              <Typography variant="body1" fontWeight={500}>{teacher.email || 'N/A'}</Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <MapPin size={20} style={{ color: '#64748b', marginRight: 12, marginTop: 2 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Address</Typography>
              <Typography variant="body1" fontWeight={500}>{teacher.address || 'N/A'}</Typography>
            </Box>
          </Box>
        </Box>
        
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Phone size={20} style={{ color: '#64748b', marginRight: 12, marginTop: 2 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Phone</Typography>
              <Typography variant="body1" fontWeight={500}>{teacher.phone || 'N/A'}</Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Calendar size={20} style={{ color: '#64748b', marginRight: 12, marginTop: 2 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">Age</Typography>
              <Typography variant="body1" fontWeight={500}>{teacher.age ? `${teacher.age} years` : 'N/A'}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherDetail;