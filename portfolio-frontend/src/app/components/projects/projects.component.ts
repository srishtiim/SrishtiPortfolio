import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  isModalOpen = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Error fetching projects', err);
        // Fallback for demonstration if API is not yet running
        this.projects = [
          {
            id: 1,
            title: "News Summarizer",
            description: "AI-powered Times of India news summarizer using Python, Hugging Face transformers, and GNews API.",
            link: "",
            category: "Deep Learning",
            image: "assets/images/projects/news_summarizer.png",
            techStack: ["Python", "TensorFlow", "OpenCV"]
          }
        ];
      }
    });
  }

  openModal(project: Project): void {
    this.selectedProject = project;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}
